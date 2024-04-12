import db from '../lib/database/index.js'
const xpperlimit = 2

let handler = async (m, { conn, command, args }) => {
	let user = await db.users.get(m.sender)
	if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  
  try {
  let count = command.replace(/^toatm/i, '')
  count = count ? /all/i.test(count) ? Math.floor(user.money / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (user.money >= xpperlimit * count) {
  await db.users.update(m.sender, (user) => {
    user.money -= xpperlimit * count
    user.atm += count
    conn.reply(m.chat, `Sukses memasukkan uang ke atm sebesar ${formatRp(count)}`, m)
  })} else conn.reply(m.chat, `Uang tidak mencukupi untuk dimasukkan ke atm sebesar ${formatRp(count)}`, m)
  } catch (e) {
  console.log(e)
  throw 'Terjadi Kesalahan'
  return
 }
}
handler.help = ['toatm']
handler.tags = ['rpg']
handler.command = /^toatm([0-9]+)|toatm|toatmall$/i

export default handler

function formatRp(angka) {
  var reverse = angka.toString().split('').reverse().join('');
  var ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join('.').split('').reverse().join('');
  return 'Rp. ' + ribuan;
}