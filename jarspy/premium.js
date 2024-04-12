let handler = async (m, { conn, text, usedPrefix, command }) => {

   let rhhh = `
*Sewa Bot AnosMD : 1 Public Bot*

*𝖦𝗋𝗈𝗎𝗉 𝖠𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝗍:*
┌  ◦ 𝖠𝖼𝖼𝖾s𝗌 𝖠𝗇𝗍𝗂𝗅𝗂𝗇𝗄
│  ◦ 𝖠𝖼𝖼𝖾𝗌𝗌 RPG Game
│  ◦ 𝖦𝖾𝗍 𝖺 𝖳𝖾𝗑𝗍 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 
│  ◦ 𝖠𝗇𝖽 𝖬𝖺𝗇𝗒𝗆𝗈𝗋𝖾
└  ◦ 𝖨𝖣𝖱 7.𝟢𝟢𝟢 / 𝖦𝗋𝗈𝗎𝗉 a week

*𝖯𝗋𝖾𝗆𝗂𝗎𝗆 𝖴𝗌𝖾𝗋:*
┌  ◦ 𝖠𝖼𝖼𝖾𝗌𝗌 𝖬𝖾𝗇𝗎 𝖯𝗋𝖾𝗆𝗂𝗎𝗆
│  ◦ Access #Join Feature
│  ◦ 𝖦𝖾𝗍 𝖴𝗇𝗅𝗂𝗆𝗂𝗍𝖾𝖽 𝖫𝗂𝗆𝗂𝗍
│  ◦ 𝖠𝗇𝖽 𝖬𝖺𝗇𝗒𝗆𝗈𝗋𝖾
└  ◦ 𝖨𝖣𝖱 16.𝟢𝟢𝟢 / Week

• Untuk Info lebih lengkap klik link
• Group: ${global.sgc}
`.trim()
conn.sendMessage(m.chat, {
     text: rhhh,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: wmt,
     body: wm,
     mediaType: 1,
     sourceUrl: sgc,
     thumbnailUrl: logo.getRandom(),
     renderLargerThumbnail: true
     }}}, { quoted: m })

}

handler.help = ['sewa']
handler.tags = ['premium']
handler.command = /^(premium|store)$/i

export default handler