import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {

let stiker = await sticker(null, `https://telegra.ph/file/1466c1926e595905f6b92.jpg`, `Katanya si ${conn.getName(m.sender)}`, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
    
}

handler.customPrefix = /^(mastah|sepuh|sesepuh)$/i;
handler.command = new RegExp();

export default handler