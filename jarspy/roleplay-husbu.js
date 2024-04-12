import { googleImage } from '@bochilteam/scraper'
import db from '../lib/database/index.js'

let handler = async (m, { isPrems, conn, text, usedPrefix, command }) => {
  const user = await db.users.get(m.sender)
  
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (user.gender == 'male ♂️') {
    throw `*Tidak bisa memilih husbu karena kamu berjenis kelamin pria!*`
    return
  }

  if (user.verified == true) {
    m.reply(`*Kamu sudah terverifikasi, tidak bisa ganti husbu*\nHubungi wa.me/${global.nomorown} untuk mengganti`)
    return
  }
  
  if (user.husbu !== "-" && isPrems == false && user.gamepass < 1) {
    m.reply('*Husbu pengguna hanya bisa diatur satu kali saja.*\n💳 atau gunakan gamepass')
    return
  }

  if (!text || !['kirigaya kazuto', 'gintoki sakata', 'itsuka shido'].includes(text.toLowerCase())) {
    throw `
Silakan pilih husbu anda:
- Gintoki Sakata
- Itsuka Shido
- Kirigaya Kazuto
Contoh: *${usedPrefix}${command} Kirigaya Kazuto*
`.trim()
    return
  }

  let katanya = `${['Terima kasih, kamu telah membuatku merasa istimewa. Saya akan sangat senang untuk menjadi bagian dari hidupmu.', 'Ini adalah momen yang saya tunggu-tunggu. Saya menerimamu dengan hati terbuka.', 'Kamu adalah impian yang menjadi kenyataan dalam hidup saya. Saya bersedia menjadi milikmu selamanya.', 'Ketika kamu berlutut di hadapan saya, kamu juga merobek hati saya. Ya, saya mau.', 'Bersama-sama, kita akan menjalani petualangan yang indah. Saya menerima lamaranmu dengan sukacita.', 'Ini adalah jawaban dari hatiku yang paling dalam. Saya mencintaimu, dan saya akan menjadi milikmu.', 'Saya yakin bahwa kita adalah pasangan yang cocok. Saya menerimamu dengan cinta sejati.', 'Saya tak sabar untuk memulai babak baru dalam hidup bersamamu. Terima kasih telah menjadi bagian penting dalam cerita hidup saya.', 'Dalam dirimu, saya menemukan kebahagiaan sejati. Saya mau, dengan segenap hati.', 'Penerimaan ini adalah awal dari perjalanan kami bersama. Mari kita ciptakan kenangan yang tak terlupakan bersama-sama.'].getRandom()}`
  
  let husbu = `${text}`
  let kapital = capitalizeFirstLetter(husbu)
  setTimeout(() => {
  conn.reply(m.chat, `Kamu telah melamar ${kapital} untuk menjadi husbumu, tunggulah balasan darinya dalam satu menit...`, m)}, 0)
  
  setTimeout(() => {
  conn.reply(m.chat, `Kamu mendapat balasan!
◦ ${kapital} mengatakan....
_"${katanya}"_`, m)}, 60000)
  setTimeout(() => {
  conn.reply(m.chat, `🥳 Lamaran kamu telah diterima oleh *${kapital}*, dan sekarang kalian memiliki status hubungan
  
Ketik */husbuku* untuk melihat detail husbu.`.trim(), m)}, 63000)

   setTimeout(() => {
   db.users.update(m.sender, (user) => {
    user.husbu = text.toLowerCase()
  })
  }, 63000)
  if (user.royalpass >= 1 && isPrems == false && user.husbu != '-') {
    await db.users.update(m.sender, (user) => {
      user.royalpass -= 1
    })
    m.reply('*-1 🏆 royal pass*')
  }  
}
handler.help = ['lamarhusbu']
handler.tags = ['roleplay']
handler.command = /^lamarhusbu$/i

export default handler

function capitalizeFirstLetter(str) {
  // Memisahkan string menjadi array kata-kata
  let words = str.split(" ");
  
  // Loop melalui setiap kata
  for (let i = 0; i < words.length; i++) {
    // Ubah huruf pertama dalam setiap kata menjadi besar
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  
  // Gabungkan kembali kata-kata menjadi satu string
  return words.join(" ");
}