import genshindb from 'genshin-db'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `⌕ Contoh : *${usedPrefix + command} Outrider*`
	try {
		let anu = await genshindb.outfits(text)
		let ini_txt = `⌕ *Ditemukan : ${anu.name}*\n\n`
		ini_txt += `_"${anu.description}"_\n\n`
		ini_txt += `◦ *Karakter :* ${anu.character}`
		ini_txt += `${anu.url.modelviewer ? `\n_${anu.url.modelviewer}_` : ''}`
		m.reply(ini_txt)
	} catch (e) {
		console.log(e)
		try {
			let anu2 = await genshindb.outfits(`${text}`, { matchCategories: true })
			m.reply(`⌕ Daftar ${text} outfit :*\n\n- ` + anu2.toString().replaceAll(',','\n- '))
		} catch (e) {
			console.log(e)
			let anu2 = await genshindb.outfits(`names`, { matchCategories: true })
			m.reply(`*Tidak Ditemukan*\n\n*Pakaian yang tersedia adalah :*\n${anu2.join(", ")}`)
		}
	}
}

handler.help = ['gioutfit']
handler.tags = ['genshin']
handler.command = /^((gi|genshin)(costumes?|outfits?))$/i

handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)