let handler = async (m, { conn }) => {
   let text = `*Cara Menggunakan AnosMD*

➥ Awali dengan perintah */!* untuk melihat daftar fitur
➥ Gunakan perintah */set* untuk melakukan registrasi

▢ Lihat informasi bot melalui perintah berikut:
◦ */info* untuk detail bot
◦ */speed* untuk melihat kecepatan koneksi bot
◦ */speedtest* untuk melihat layanan yang digunakan bot

Jangan ragu untuk bertanya kepada pemilik bot jika kamu mengalami kesulitan atau memiliki pertanyaan lebih lanjut.

© 2023 AnosMD.`
  
conn.sendMessage(m.chat, {
     text: text,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: wm,
     body: wm,
     mediaType: 1,
     sourceUrl: sig,
     thumbnailUrl: logo.getRandom(),
     renderLargerThumbnail: false
     }}}, { quoted: m })

}
handler.help = ['help']
handler.tags = ['main']
handler.command = /^help$/i

export default handler