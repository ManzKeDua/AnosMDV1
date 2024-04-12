import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `⌕ Contoh : *${usedPrefix + command} Temptation*`
	try {
		let anu = await genshindb.foods(text)
		let ini_txt = `⌕ *Ditemukan : ${anu.name}*\n\n`
		ini_txt += `_"${anu.description}"_\n\n`
		ini_txt += `◦ *Kelangkaan : ${anu.rarity}*\n`
		ini_txt += `◦ *Jenis :* ${anu.foodtype}\n`
		ini_txt += `◦ *Kategori :* ${anu.foodfilter} ( ${anu.foodcategory} )\n\n`
		ini_txt += `${anu.efect ? `*Effect :*\n${anu.effect}\n\n` : ''}`
		ini_txt += `${anu.suspicious ? `*Suspicious :*\n${anu.suspicious.effect}\n_"${anu.suspicious.description}"_\n\n` : ''}`
		ini_txt += `${anu.normal ? `*Normal :*\n${anu.normal.effect}\n_"${anu.suspicious.description}"_\n\n` : ''}`
		ini_txt += `${anu.delicious ? `*Delicious :*\n${anu.delicious.effect}\n_"${anu.suspicious.description}"_\n\n` : ''}`
		m.reply(ini_txt)
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.foods(`names`, { matchCategories: true })
		m.reply(`*Tidak Ditemukan*\n\n*Makanan yang tersedia adalah :*\n${anu2.join(", ")}`)
	}
}

handler.help = ['gifood']
handler.tags = ['genshin']
handler.command = /^((gi|genshin)foods?)$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)