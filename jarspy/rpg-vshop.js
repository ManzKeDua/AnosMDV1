import db from '../lib/database/index.js'

const items = {
    vbuy: {
        luxury: {
            keping: 1,
        },
        bruh: {
            keping: 1360,
        },
        lona: {
            keping: 205000,
        },
        gitar: {
            keping: 436000,
        },
        pianika: {
            keping: 1450000,
        },
        terompet: {
            keping: 48000,
        },
        crypto: {
            keping: 15000,
        },
        robux: {
            keping: 15000,
        },
        auricore: {
            gmoney: 1,
        },
        rivena: {
            auricore: 7,
        },
        safari: {
            auricore: 1200,
        },
    },
    vsell: {
        bruh: {
            keping: 250,
        },
        lona: {
            keping: 1000,
        },
        car: {
            keping: 70,
        },
        gitar: {
            keping: 40,
        },
        pianika: {
            keping: 50,
        },
        terompet: {
            keping: 80,
        },
        crypto: {
            keping: 200,
        },
        ironore: {
            auricore: 2,
        },
        goldore: {
            auricore: 3,
        },
        diamondore: {
            auricore: 5,
        },
        ancientdebris: {
            auricore: 50,
        },
        kondom: {
            keping: 2,
        },
    }
}

let handler = async (m, { conn, command, usedPrefix, args, text, isPrems}) => {
    let user = await db.users.get(m.sender)
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (command.toLowerCase() == 'vshop') {
        let text = `
*🇹🇰 VToko*

Ingin menggunakan *vtoko*?
Ketik _/vbuy_ bila ingin membeli!
Ketik _/vsell_ bila ingin menjual!
`.trim()
        conn.reply(m.chat, text, m)
        return
    }
    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    const info = `
⌕ Contoh penggunaan: *${usedPrefix}${command} potion 10*
    
▢ Daftar Barang: 
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `${global.rpg.emoticon(v)}${v} | ${toSimple(listItems[v][paymentMethod])} ${global.rpg.emoticon(paymentMethod)}${paymentMethod}`.trim()
    }).join('\n')}
`.trim()
    const item = (args[0] || '').toLowerCase()
   
    if (!listItems[item]) return m.reply(info)
    
    if (!args[1]) {
        m.reply(info)
        return
    }
    
    let total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1)) : 1) * ({"K":1e3,"M":1e6,"B":1e9,"T":1e12,"QA":1e15,"QI":1e18,"SX":1e21,"SP":1e24,"OC":1e27,"N":1e30,"DC":1e33,"UD":1e36,"DD":1e39,"TD":1e42,"QUA":1e45,"QUI":1e48}[args[1].toUpperCase().replace(/[^KMBTQAISXONDCUP]/g,'')] || 1);
    
    if (command.toLowerCase() == 'vbuy') {
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu tidak memiliki cukup ${global.rpg.emoticon(paymentMethod)}${paymentMethod} untuk membeli *${toSimple(total)}* ${global.rpg.emoticon(item)}${item}. Kamu membutuhkan tambahan *${toSimple((listItems[item][paymentMethod] * total) - user[paymentMethod])}* ${paymentMethod} untuk dapat membeli`)
        await db.users.update(m.sender, (user) => {
            user[paymentMethod] -= listItems[item][paymentMethod] * total
            user[item] += total
        })
        return m.reply(`Kamu telah membeli *${toSimple(total)}* ${global.rpg.emoticon(item)}${item}`)
    } else if (command.toLowerCase() == 'vsell') {
        if (isPrems && /all/i.test(args[1]))  total =  Math.max(Math.floor(parseInt(user[item])), 1)
        if (user[item] < total) return m.reply(`Kamu tidak memiliki cukup *${global.rpg.emoticon(item)}${item}* untuk dijual, Kamu hanya memiliki ${user[item]} item`)
        const reward = listItems[item]
        if (Object.keys(reward).length > 1) throw new Error('Banyak hadiah belum didukung')
        const rewardKey = Object.keys(reward)[0]
        if (!(rewardKey in user)) throw new Error(`Pengguna tidak memiliki ${rewardKey} dalam database mereka, tetapi pemberian hadiah ada!`)
        await db.users.update(m.sender, (user) => {
            user[item] -= total
            user[rewardKey] += listItems[item][rewardKey] * total
        })
        return m.reply(`Kamu telah menjual *${toSimple(total)}* ${global.rpg.emoticon(item)}${item} dan mendapatkan *${toSimple(listItems[item][rewardKey] * total)}* ${global.rpg.emoticon(rewardKey)}`)
    }
}

handler.help = ['vbuy', 'vsell'].map(v => v + '')
handler.tags = ['rpg']
handler.command = /^(vshop|vbuy|vsell)$/i

handler.disabled = false

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

function toSimple(number) {
    if (isNaN(parseFloat(number))) return number;
    if (parseFloat(number) === 0) return '0';
    number = parseFloat(number).toFixed(0);
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui'];
    const base = 1000;
    const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
    const suffix = suffixes[exponent] || '';
    const simplified = number / Math.pow(base, exponent);
    const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 });
    return formatter.format(simplified) + suffix;
}

function number(x = 0) {
    x = parseInt(x)
    return !isNaN(x) && typeof x == 'number'
}