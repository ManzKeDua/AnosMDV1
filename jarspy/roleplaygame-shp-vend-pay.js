import db from '../lib/database/index.js'

const items = {
  pay: {
    dog: {
      credit: 50
    },
    dragon: {
      credit: 3000
    },
    getaran: {
      credit: 5
    },
    goncangan: {
      credit: 20
    },
    gundakan: {
      credit: 90
    },
    diamondpickaxe: {
      credit: 50
    },
  },
  vend: {
    getaran: {
      coinly: 10
    },
    goncangan: {
      coinly: 420
    },
    gundakan: {
      cashly: 500
    },
    diamondpickaxe: {
      diamondlock: 2
    },
  }
}

let handler = async (m, { command, usedPrefix, args }) => {
  let user = await db.users.get(m.sender)
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (user.level < 2) return m.reply(`Minimal 🔼 *level 2* untuk menggunakan fitur ini!`)
  const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
  const info = `
⌕ Contoh Penggunaan: *${usedPrefix}${command} dog 10*
    
▢ Daftar Ultra Item: 
${Object.keys(listItems).map((v) => {
    let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
    return `${global.rpg.emoticon(v)}${v} | ${toSimple(listItems[v][paymentMethod])} ${global.rpg.emoticon(paymentMethod)}${paymentMethod}`.trim()
  }).join('\n')}
`.trim()
  const item = (args[0] || '').toLowerCase()
  const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
  if (!listItems[item]) return m.reply(info)
  if (command.toLowerCase() == 'pay') {
    let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
    if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu tidak memiliki cukup ${global.rpg.emoticon(paymentMethod)}${paymentMethod} untuk membeli *${total}* ${global.rpg.emoticon(item)}${item}. Kamu membutuhkan tambahan *${(listItems[item][paymentMethod] * total) - user[paymentMethod]}* ${paymentMethod} untuk dapat membeli`)
    await db.users.update(m.sender, (user) => {
      user[paymentMethod] -= listItems[item][paymentMethod] * total
      user[item] += total
    })
    return m.reply(`Kamu membeli *${total}* ${global.rpg.emoticon(item)}${item}`)
  } else {
    if (user[item] < total) return m.reply(`Kamu tidak memiliki cukup *${global.rpg.emoticon(item)}${item}* untuk dijual, Anda hanya memiliki ${user[item]} item`)
    const reward = listItems[item]
    if (Object.keys(reward).length > 1) throw new Error('Banyak hadiah belum didukung')
    const rewardKey = Object.keys(reward)[0]
    if (!(rewardKey in user)) throw new Error(`Pengguna tidak memiliki ${rewardKey} dalam database mereka, tetapi hadiah memberikannya!`)
    await db.users.update(m.sender, (user) => {
      user[item] -= total
      user[rewardKey] += listItems[item][rewardKey] * total
    })
    return m.reply(`Kamu menghapus *${total}* ${global.rpg.emoticon(item)}${item} dan mendapatkan *${listItems[item][rewardKey] * total}* ${global.rpg.emoticon(rewardKey)}`)
  }
}

handler.help = ['pay', 'vend'].map(v => v + '')
handler.tags = ['ultra']
handler.command = /^(pay|vend)$/i

handler.disabled = false

export default handler

function isNumber(number) {
  if (!number) return number
  number = parseInt(number)
  return typeof number == 'number' && !isNaN(number)
}

function toSimple(number) {
  number = parseInt(number * 1)
  if (!isNumber(number)) return number
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(number)
}