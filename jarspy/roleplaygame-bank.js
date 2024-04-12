import db from '../lib/database/index.js'

let handler = async (m, { conn }) => {
  let user = await db.users.get(m.sender)
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (user.nama == '-') {
  throw 'Kamu harus memiliki nama untuk mengakses fitur ini. Ketik */setnama* untuk mengatur namamu'
  return
  }
  let caption = `
*B A N K  U S E R*
◦ Nama: *${user.nama}*
◦ ATM: *${formatRp(user.atm)}* 💲
◦ Money: *${formatRp(user.money)}* 💲

*E - M O N E Y*
◦ Dana: *${formatRp(user.dana)}* 💲
◦ Gopay: *${formatRp(user.gopay)}* 💲

*O T H E R S*
◦ Pulsa: *${formatRp(user.pulsa)}* 💲

`.trim()
  conn.reply(m.chat, caption, m)
}
handler.help = ['dompet']
handler.tags = ['rpg']
handler.command = /^(atm|dompet|bank)$/i

export default handler

function formatRp(angka) {
  var reverse = angka.toString().split('').reverse().join('');
  var ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join('.').split('').reverse().join('');
  return 'Rp. ' + ribuan;
}