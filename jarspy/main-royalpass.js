import db from '../lib/database/index.js'
import Connection from '../lib/connection.js'

let handler = async (m, { conn: _conn, conn }) => {

  let user = await db.users.get(m.sender)
  if (!user.royalpass < 1) {
    conn.reply(m.chat, '*Kamu sudah mengklaim Royal Pass*', m)
   return
  }

  if (m.chat) {
    conn.reply(m.chat, '*Selamat kamu mendapat 1 Royal Pass*', m)
    await db.users.update(m.sender, (user) => {
    user.royalpass += 1
   })
   return
  }
  await conn.reply(m.chat, `*Kamu harus berada digrup ${global.sh} untuk mengambil Royal Pass!*\n\nGrup: ${global.bitly}`, m)
}
handler.customPrefix = /^(royalpass|claimroyal|getroyal)$/i
handler.command = new RegExp
handler.premium = false

export default handler