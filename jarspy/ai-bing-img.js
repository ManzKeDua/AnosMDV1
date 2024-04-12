let handler = async (m, {
    usedPrefix,
    command,
    text
}) => {
    try {
        if (!text) return m.reply(Func.example(usedPrefix, command, 'Cat'))
        m.react('🕒')
        const json = await Func.fetchJson(API('alya', '/api/bing-image', { q: text }, 'apikey'))
        if (!json.status) return m.reply(Func.jsonFormat(json))
        json.data.map((v, i) => {
            conn.sendFile(m.chat, v.url, '', '', m)
        })
    } catch (e) {
        console.log(e)
        return m.reply('error')
    }
}
handler.help = handler.command = ['bing-image']
handler.tags = ['ai']
handler.limit = handler.premium = true
export default handler