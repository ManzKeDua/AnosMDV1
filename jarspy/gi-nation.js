import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `⌕ Contoh : ${usedPrefix + command} Liyue`
    let res = await fetch(`https://api.genshin.dev/nations/${encodeURIComponent(text)}`)
    let res2 = await fetch(`https://api.genshin.dev/nations`)
    let json = await res.json()
    let json2 = await res2.json()
    if (json.name != undefined) {
        let ini_txt = `◦ *Nama : ${json.name}*\n\n`
        ini_txt += `◦ *Elemen :* ${json.element}\n`
        ini_txt += `◦ *Archon :* ${json.element}\n`
        ini_txt += `◦ *ControllingEntity : ${json.controllingEntity}*`
        await m.reply(ini_txt)
    } else {
        let ini_txt = `*Tidak Ditemukan*\n\n*Bangsa yang tersedia adalah :*\n${json2.join(", ")}`
        m.reply(ini_txt)
    }
}

handler.help = ['gination']
handler.tags = ['genshin']
handler.command = /^((gi|genshin)nations?)$/i

handler.limit = true

export default handler