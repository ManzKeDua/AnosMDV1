import fetch from 'node-fetch'
import db from '../lib/database/index.js'

let handler = async (m, { conn, usedPrefix }) => {
let user = await db.users.get(m.sender)
     if (!user.royalpass || user.royalpass < 1) {
     throw royals
     }
    let res = await fetch('https://api.waifu.pics/nsfw/trap')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendFile(m.chat, json.url, json.url, `Trap`.trim(), m)
    //conn.sendButton(m.chat, 'Istri kartun', author, json.url, [['trap', `${usedPrefix}trap`]], m)
}

handler.help = ['trap']
handler.tags = ['haram']
handler.command = /^(trap)$/i

handler.private = false

export default handler