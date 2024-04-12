import db from '../lib/database/index.js'

let handler = async (m, { conn }) => {
const chat = await db.chats.get(m.chat)
if (chat.sRules === '') return m.reply('Belum ada rules di group ini gunakan perintah\n*.setrules* untuk menambahkan rules')
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_=> null) || './src/avatar_contact.png'
    conn.sendFile(m.chat, pp, 'pp.jpg', `*RULES:*\n${chat.sRules}`, m, false)
}
handler.help = ['rules']
handler.tags = ['group']
handler.command = ['rulesgc', 'rules']
handler.group = true

export default handler