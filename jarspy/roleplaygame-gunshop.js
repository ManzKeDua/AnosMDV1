import db from '../lib/database/index.js'

const cooldown = 30000

const items = {
    buygun: {
        tombak: {
            clickly: 50
        },
        busur: {
            money: 1000000,
        },
        anakpanah: {
            money: 8000,
        },
        glock: {
            dana: 300000,
        },
        ammo: {
            gopay: 35000,
        },
        ak47: {
            dana: 64000000,
        },
        m4: {
            dana: 34000000,
        },
        m16: {
            dana: 84000000,
        },
        ar15: {
            dana: 77000000,
        },
        scar: {
            dana: 90000000,
        },
        famas: {
            dana: 90000000,
        },
        aug: {
            dana: 94000000,
        },
        uzi: {
            dana: 55000000,
        },
        mp5: {
            dana: 50000000,
        },
        p90: {
            dana: 64000000,
        },
        mac10: {
            dana: 40000000,
        },
        vector: {
            dana: 42000000,
        },
        barrettm82: {
            dana: 1990000000,
        },
        remington700: {
            dana: 20000000,
        },
        dragunovsvd: {
            dana: 880000000,
        },
        m40: {
            dana: 40000000,
        },
        m24: {
            dana: 40000000,
        }
    },
    sellgun: {
        tombak: {
            clickly: 25
        },
        busur: {
            money: 5000,
        },
        anakpanah: {
            money: 40,
        },
        glock: {
            money: 1500,
        },
        ammo: {
            money: 175,
        },
        ak47: {
            money: 320000,
        },
        m4: {
            money: 170000,
        },
        m16: {
            money: 420000,
        },
        ar15: {
            money: 385000,
        },
        scar: {
            money: 450000,
        },
        famas: {
            money: 450000,
        },
        aug: {
            money: 470000,
        },
        uzi: {
            money: 275000,
        },
        mp5: {
            money: 250000,
        },
        p90: {
            money: 320000,
        },
        mac10: {
            money: 200000,
        },
        vector: {
            money: 210000,
        },
        barrettm82: {
            money: 9950000,
        },
        remington700: {
            money: 100000,
        },
        dragunovsvd: {
            money: 4400000,
        },
        m40: {
            money: 200000,
        },
        m24: {
            money: 200000,
        }
    }
}

let handler = async (m, { conn, command, usedPrefix, args, text, isPrems }) => {
    let user = await db.users.get(m.sender)

    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (user.job == 'hunter') {
    if (new Date() - user.lastshop < cooldown) {
        const remainingTime = new Date(user.lastshop + cooldown) - new Date()
        const formattedTime = new Date(remainingTime).toISOString().substr(11, 8)
        throw `Kamu baru saja pergi ke toko! Tunggu selama *${formattedTime}*`
    }

    if (command.toLowerCase() == 'gunshop') {
        let text = `
*🕵🏿‍♂️ Gun Shop*

Ingin menggunakan *Toko Senjata*?
Ketik _/buygun_ bila ingin membeli senjata!
Ketik _/sellsell_ bila ingin menjual senjata!
`.trim()
        conn.reply(m.chat, text, m)
        return
    }

    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    const info = `
⌕ Contoh penggunaan: *${usedPrefix}${command} ak47 1*
    
▢ Daftar Senjata: 
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `${global.rpg.emoticon(v)}${capitalizeFirstLetter(v)} | ${toSimple(listItems[v][paymentMethod])} ${global.rpg.emoticon(paymentMethod)}${capitalizeFirstLetter(paymentMethod)}`.trim()
    }).join('\n')}
`.trim()

    const item = (args[0] || '').toLowerCase()

    if (!listItems[item]) {
        return m.reply(info)
    }

    if (!args[1]) {
        m.reply(info)
        return
    }

    let total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1)) : 1) * ({"K":1e3,"M":1e6,"B":1e9,"T":1e12,"QA":1e15,"QI":1e18,"SX":1e21,"SP":1e24,"OC":1e27,"N":1e30,"DC":1e33,"UD":1e36,"DD":1e39,"TD":1e42,"QUA":1e45,"QUI":1e48, "SXD":1e51, "SPD":1e54, "OCD":1e57, "NOD":1e60, "VG":1e63}[args[1].toUpperCase().replace(/[^KMBTQAISXONDCUP]/g,'')] || 1);

    if (command.toLowerCase() == 'buygun') {
        user = await db.users.get(m.sender)
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        let previous = user[paymentMethod] * 1; // Simpan nilai uang sebelumnya
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) {
            return m.reply(`Kamu tidak memiliki cukup ${global.rpg.emoticon(paymentMethod)}${paymentMethod} untuk membeli *${toSimple(total)}* ${global.rpg.emoticon(item)}${capitalizeFirstLetter(item)}. Kamu memerlukan *${toSimple((listItems[item][paymentMethod] * total) - user[paymentMethod])}* ${paymentMethod} lagi untuk dapat membeli`)
        }
        // Mengurangi uang dan menambahkan item
        await db.users.update(m.sender, (user) => {
            user[paymentMethod] -= listItems[item][paymentMethod] * total
            user[item] += total
            user.lastshop = new Date() * 1
        })
        return m.reply(`Kamu telah membeli *${toSimple(total)}* ${global.rpg.emoticon(item)}${capitalizeFirstLetter(item)}`)
    } else if (command.toLowerCase() == 'sellgun') {
        let previous = user[item] * 1; // Simpan jumlah item sebelum penjualan
        if (isPrems && /all/i.test(args[1])) {
            total = user[item];
        }
        if (user[item] < total) {
            return m.reply(`Kamu tidak memiliki cukup *${global.rpg.emoticon(item)}${capitalizeFirstLetter(item)}* untuk dijual. Anda hanya memiliki ${toSimple(user[item])} item`)
        }
        const reward = listItems[item]
        if (Object.keys(reward).length > 1) {
            throw new Error('Banyak hadiah belum didukung')
        }
        const rewardKey = Object.keys(reward)[0]
        if (!(rewardKey in user)) {
            throw new Error(`Pengguna tidak memiliki ${rewardKey} dalam database mereka, tetapi hadiah memberikannya!`)
        }
        // Mengurangi item dan menambahkan hadiah
        await db.users.update(m.sender, (user) => {
            user[item] -= total
            user[rewardKey] += listItems[item][rewardKey] * total
            user.lastshop = new Date() * 1
        })
        return m.reply(`Kamu telah menjual *${toSimple(total)}* ${global.rpg.emoticon(item)}${capitalizeFirstLetter(item)} dan mendapatkan *${toSimple(listItems[item][rewardKey] * total)}* ${global.rpg.emoticon(rewardKey)}`)
    }
    return
  }
await conn.reply(m.chat, '*Fitur ini hanya dikhususkan untuk orang yang bekerja sebagai hunter*', m);
}

handler.help = ['gunshop'].map(v => v + '')
handler.tags = ['rpg']
handler.command = /^(gunshop|buygun|sellgun)$/i
handler.cooldown = cooldown

handler.disabled = false

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

function toSimple(number) {
    if (isNaN(parseFloat(number))) return number
    if (parseFloat(number) === 0) return '0'
    number = parseFloat(number).toFixed(0)
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg']
    const base = 1000
    const exponent = Math.floor(Math.log10(Math.abs(number)) / 3)
    const suffix = suffixes[exponent] || ''
    const simplified = number / Math.pow(base, exponent)
    const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 })
    return formatter.format(simplified) + suffix
}

function capitalizeFirstLetter(str) {
  // Memisahkan string menjadi array kata-kata
  let words = str.split(" ");
  
  // Loop melalui setiap kata
  for (let i = 0; i < words.length; i++) {
    // Ubah huruf pertama dalam setiap kata menjadi besar
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  
  // Gabungkan kembali kata-kata menjadi satu string
  return words.join(" ");
}