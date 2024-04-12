import db from '../lib/database/index.js'
import { performance } from 'perf_hooks';
import { getUserCache } from './_cache.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {    
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    
    let old = performance.now()
    let neww = performance.now()
    
    let users = getUserCache();
    
    let infobot = `
〘 ${conn.getName(conn.user.jid)} 〙
➥ ⬡ *ᴠᴇʀsɪ:* _ᴠ2.0.1_
➥ ⬡ *ʙᴀsᴇ:* _Ingpo_
➥ ⬡ *ᴍᴀsᴀʟᴀʜ:* wa.me/${global.nomorown}
➥ ⬡ *ᴘʀᴇғɪx:* '${usedPrefix}'
➥ ⬡ *ᴍᴇɴᴜ:* ${usedPrefix}ᴍᴇɴᴜ
➥ ⬡ *ᴘɪɴɢ:* _${Math.floor((neww - old) * 10000)} *ᴍs*_
➥ ⬡ *ᴊᴜᴍʟᴀʜ ᴘᴇɴɢɢᴜɴᴀ:* _${users.length}_ *ᴘᴇɴɢɢᴜɴᴀ*
➥ ⬡ *ᴡᴀᴋᴛᴜ ᴀᴋᴛɪғ:* _${uptime}_

〘 ᴅᴏɴᴀsɪ 〙
➥ ɢᴏᴘᴀʏ: _0889897216271_
➥ ᴛᴇʟᴋᴏᴍsᴇʟ: _088989721627_

 ᴍᴇᴍʙᴇʀɪ sᴀʀᴀɴ? _wa.me/${global.nomorown}_
════════════════════
`.trim()

conn.sendMessage(m.chat, {
     text: infobot,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: wmt,
     body: wm,
     mediaType: 1,
     sourceUrl: sig,
     thumbnailUrl: logo.getRandom(),
     renderLargerThumbnail: true
     }}}, { quoted: m })
}

handler.help = ['infobot']
handler.tags = ['info']

handler.command = /^(infobot|info|bot)$/i
handler.rowner = false

export default handler


function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}