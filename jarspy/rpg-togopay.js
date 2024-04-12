import db from '../lib/database/index.js'
const xpperlimit = 2

let handler = async (m, { conn, command, args }) => {
	let user = await db.users.get(m.sender)
	if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  
  try {
  let count = command.replace(/^togopay/i, '')
  count = count ? /all/i.test(count) ? Math.floor(user.money / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (user.money >= xpperlimit * count) {
  await db.users.update(m.sender, (user) => {
    user.money -= xpperlimit * count
    user.gopay += count
    conn.reply(m.chat, `Sukses menukarkan money ke saldo gopay sebesar ${formatRp(count)}`, m)
  })} else conn.reply(m.chat, `Money tidak mencukupi untuk ditukar ke saldo gopay sebesar ${formatRp(count)}`, m)
  } catch (e) {
  console.log(e)
  throw 'Terjadi Kesalahan'
  return
 }
}
handler.help = ['togopay']
handler.tags = ['rpg']
handler.command = /^togopay([0-9]+)|togopay|togopayall$/i

export default handler

function formatRp(angka) {
  var reverse = angka.toString().split('').reverse().join('');
  var ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join('.').split('').reverse().join('');
  return 'Rp. ' + ribuan;
}