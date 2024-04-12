import { jadwalsholat, googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `⌕ Contoh Penggunaan: ${usedPrefix}${command} Samarinda`
    try {
    const thumb = await googleImage('kota ' + text)
    const res = await jadwalsholat(text)
    let solat = `
*「 Jadwal Sholat 」*

${Object.entries(res.today).map(([name, data]) => `*Sholat ${name}:* ${data}`).join('\n').trim()}
`.trim()

conn.sendMessage(m.chat, { text: solat, contextInfo: { externalAdReply: { showAdAttribution: true, title: 'Jadwal Sholat', body: `Daerah: ${text}`, thumbnailUrl: thumb.getRandom(), sourceUrl: sig, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} catch (e) {
		console.log(e)
		m.reply("*[ ! ]* Kota/daerah belum tersedia")			
   }

}
handler.help = ['salat']
handler.tags = ['quran']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i

export default handler