import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `⌕ Contoh : *${usedPrefix + command} Shiba*`
	try {
		let anu = await genshindb.animals(text)
		let ini_txt = `⌕ *Ditemukan : ${anu.name}*\n\n`
		ini_txt += `"${anu.description}"\n\n`
		ini_txt += `◦ *Kategori :* ${anu.category}\n`
		ini_txt += `◦ *Jenis Hitungan :* ${anu.counttype}\n`
		ini_txt += `◦ _Sort Order : ${anu.sortorder}_`
		m.reply(ini_txt)
	} catch (e) {
		console.log(e)
		try {
			let anu2 = await genshindb.animals(`${text}`, { matchCategories: true })
			m.reply(`⌕ *Daftar ${text} kategori :*\n\n- ` + anu2.toString().replaceAll(',','\n- '))
		} catch (e) {
			console.log(e)
			let anu2 = await genshindb.animals(`names`, { matchCategories: true })
			m.reply(`*Tidak Ditemukan*\n\n*Binatang yang tersedia adalah :*\n${anu2.join(", ")}`)
		}
	}
}

handler.help = ['gianimal']
handler.tags = ['genshin']
handler.command = /^((gi|genshin)animals?)$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)