let handler = async (m, { conn }) => {
   let text = `❖ ===================== ❖ ➦
Cara bermain roleplay di AnosMD

Sebelum itu, disarankan untuk menyetel profil terlebih dahulu dengan perintah */set.*
❖ ===================== ❖ ➥

Kamu dapat melihat inventory dengan perintah /inventory atau /inv. Jangan lupa juga ada sistem jual beli (shop) yang dapat ditemukan melalui perintah /buy, /cbuy, /pbuy, /vbuy, /buyfood, dan lain-lain.

◈ *=====================* ◈
Berikut adalah daftar perintah roleplay yang dapat kamu gunakan:

 • /adventure ~ Berpetualangan untuk mendapatkan item dan uang
 • /blackjack ~ Untuk berjudi coinly
 • /check ~ Melihat inventaris orang lain
 • /daily ~ Mendapatkan hadiah harian
 • /enchant ~ Mendapatkan item langka
 • /eat ~ Untuk makan
 • /hatch ~ Menetaskan kandang hewan
 • /judi <jumlah> ~ Untuk berjudi uang
 • /shop ~ Toko untuk jual beli barang
 • /quest ~ Tantangan dan misi untuk mendapatkan hadiah
 • /open ~ Membuka peti
 • /lamarwaifu ~ Lamar waifu favoritmu
 • /lamarhusbu ~ Lamar husbu favoritmu
 • /lamarkerja ~ Melamar pekerjaan untuk mendapat lebih banyak uang
 • /kerja ~ Untuk melakukan pekerjaan
 • /lamarhusbu ~ Lamar husbu favoritmu
 • /misi ~ Untuk mendapatkan misi
 • /pilihskill ~ Pilih skillmu untuk melakukan misi
 • /atm ~ melihat isi saldo uang dan emoney mu
 • /toatm ~ melihat isi saldo uang dan emoney mu
 • /togopay ~ Mengkonversi uang ke saldo gopay
 • /todana ~ Mengkonversi uang ke saldo dana
 • /tomoney ~ Mengkonversi saldo atm ke uang
 • /gomoney ~ Mengkonversi saldo gopay ke uang
 • /damoney ~ Mengkonversi saldo dana ke uang
◈ *=====================* ◈

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