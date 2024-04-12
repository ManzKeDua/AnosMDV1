let handler = async (m, { conn, usedPrefix: _p, __dirname, text, command }) => {
  let don = 'media/qr.png'
  let cap = `▷ DONASI BOT ◁
▪ Pulsa: 0889897216271
▫ Dana: 0889897216271
▫ OVO: 0889897216271
▪ Gopay: 0889897216271
▪ QR: inbok owner aja Dengan cara ketik .owner

Semoga Anda diberikan kemudahan rezeki dan dilipatgandakan rezeki Anda.`
conn.sendMessage(m.chat, {
text: cap,
contextInfo: {
externalAdReply: {
title: 'Powered By ManzKenz',
body: 'D O N A T E',
thumbnailUrl: 'https://telegra.ph/file/b3fde6c185639ed2e94f8.jpg',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m}) 
}

handler.help = ['donasi'];
handler.tags = ['info'];
handler.command = /^(donasi)$/i;

export default handler