import fetch from 'node-fetch'

let handler = async(m, { conn, text }) => {
  if (!text) throw `*Masukkan nama karakternya*`
  try {
  let res = await fetch(`https://api.xyroinee.xyz/api/others/chargi?q=${text}&apikey=${global.xyro}`)
  let anu = await res.json()
  let gi = anu.data
  let teks = `◦ *Nama:* ${gi.name}\n◦ *Nama Panjang:* ${gi.fullname}\n◦ *Title:* ${gi.title}\n◦ *Rarity:* ${gi.rarity}\n◦ *Elemen:* ${gi.element}\n◦ *Jenis Senjata:* ${gi.weapontype}\n◦ *Substat:* ${gi.substat}\n◦ *Jenis Kelamin:* ${gi.gender}\n◦ *Body:* ${gi.body}\n◦ *Asosiasi:* ${gi.association}\n◦ *Wilayah:* ${gi.region}\n◦ *Afiliasi:* ${gi.affiliation}\n◦ *Ulang Tahun:* ${gi.birthday}\n◦ *Konstelasi:* ${gi.constellation}\n◦ *Deskripsi:* ${gi.description}\n\n`
  anu = anu.data.costs.ascend1.map((v) => `◦ *Nama:* ${v.name}\n⌕ *Jumlah:* ${v.count}`).join`\n──────────────────\n`
  conn.sendFile(m.chat, gi.images.cover1, '' , teks + anu, m)
  } catch (e) {
  m.reply(`*Tidak dapat menemukan karakter*`)
  }
}
handler.help = ['charagi']
handler.tags = ['genshin']
handler.command = /^(charagi)$/i
handler.limit = true

export default handler