import fetch from 'node-fetch'
import db from '../lib/database/index.js'

let handler = async (m, { conn, usedPrefix }) => {
    let user = await db.users.get(m.sender)
    if (!user.royalpass || user.royalpass < 1) {
    throw royals
    }
    let res = await fetch('https://api.waifu.pics/nsfw/waifu')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendFile(m.chat, json.url, json.url, `Hentai`.trim(), m)
}

handler.help = ['hentai']
handler.tags = ['nsfw','premium']
handler.command = /^(hentai)$/i

handler.premium = true

export default handler