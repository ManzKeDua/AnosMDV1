import db from '../lib/database/index.js'

let handler = async (m, { conn, text, isOwner, isAdmin, usedPrefix, command }) => {
  const chat = await db.chats.get(m.chat)
  if (text) {
    if (!(isAdmin || isOwner)) return m.reply(global.dfail('admin', m, conn))
    chat.sRules = text
    m.reply('Rules berhasil diatur.')
  } else throw `Penggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} ga boleh ngirim bokep`
}
handler.help = handler.command = ['setrules']
handler.tags = ['group']
handler.group = handler.admin = true

export default handler