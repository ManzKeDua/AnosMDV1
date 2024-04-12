import { googleImage } from '@bochilteam/scraper'
import db from '../lib/database/index.js'

let handler = async(m, { args, conn, text }) => {

let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : ''
  if (!who) {
    who = m.sender
  }
const user = await db.users.get(who)
const usar = await db.users.get(m.sender)
const res = await googleImage(`${user.husbu} anime icons`)

if (usar.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
if (user.nama == '-' || user.gender == 'non-binary 🎭' || user.umur == '-') {
throw `Untuk menggunakan fitur ini, kamu harus teregistrasi terlebih dahulu dengan cara:\n\nKetik */set* dan ikuti tutorialnya`
    return
  }

if (user.husbu == '-') {
throw `Kamu belum punya husbu! Ketik */lamarhusbu* dan pilih husbumu.`
    return
  }

let husbu = `${user.husbu}`
let kapital = capitalizeFirstLetter(husbu)

let caption = `*HUSBU INFO*
🕺🏻 Nama Husbu: ${kapital}
💘 Kepercayaan Husbu: ${user.husbuexp}% / 500%

${user.nama} dan ${kapital} adalah sepasang kekasih dengan kehidupan yang sangat bahagia. ${user.nama} beruntung sekali karena memilih husbu seperti ${kapital}. Semoga mereka selalu hidup bahagia

Dengan melakukan kencani, kamu dapat menambah kepercayaannya setiap 1%

Fact: _level husbumu tidak akan tereset walaupun sudah mengganti husbu._
`.trim()

conn.sendFile(m.chat, res.getRandom(), 'husbu.jpg', caption, m)

}

handler.help = ['husbuku']
handler.tags = ['roleplay']
handler.command = /^(husbuku)$/i

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