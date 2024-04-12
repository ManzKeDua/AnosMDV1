import fetch from 'node-fetch'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!text) throw `⌕ Contoh : ${usedPrefix + command} Insulation Potion`
    let res = await fetch(`https://api.genshin.dev/consumables/potions`)
    let json = await res.json()
    if (json[`${text.replace(/ /g, '-')}`] != undefined) {
        let anu = json[`${text.replace(/ /g, '-')}`]
        let ini_txt = `◦ *Nama : ${anu.name}*\n\n`
        ini_txt += `◦ Kelangkaan : ${anu.rarity}\n`
        ini_txt += `◦ Efek : ${anu.effect}\n\n`
        ini_txt += `◦ *Kerajinan :*\n`
        for (var x of anu.crafting) {
            ini_txt += `◦ Benda : ${x.item}\n`
            ini_txt += `◦ Jumlah : ${x.quantity}\n`
            ini_txt += `──────────\n\n`
        }
        await m.reply(ini_txt)
    } else {
        let bruh = Object.keys(json)
        let ini_txt = `*Tidak Ditemukan*\n\n*Ramuan yang tersedia adalah :*\n${bruh.toString().replace(/-/g, ' ').replace(/,/g, ', ')}`
        m.reply(ini_txt)
    }
}

handler.help = ['gipotion']
handler.tags = ['genshin']
handler.command = /^(gipotions?)$/i

handler.limit = true

export default handler