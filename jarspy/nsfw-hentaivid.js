import axios from 'axios'
import cheerio from 'cheerio'

let jarsepay = async (m, { conn, text }) => {
    let res = await hentaiVideo(text)
    let result = res[Math.floor(Math.random(), res.length)]
    let caption = `
⭔ Title : ${result.title}
⭔ Category : ${result.category}
⭔ Mimetype : ${result.type}
⭔ Views : ${result.views_count}
⭔ Shares : ${result.share_count}
⭔ Source : ${result.link}
⭔ Media Url : ${result.video_1}
`.trim()
    await conn.sendMessage(m.sender, { video: { url: result.video_1 }, caption: caption }, { quoted: m })
    await conn.reply(m.chat, 'Video telah dikirimkan ke chat pribadi.', m)
}

jarsepay.help = ['hentaivideo']
jarsepay.tags = ['nsfw','premium']
jarsepay.command = ['vidhentai', 'videohentai', 'hentaivid', 'hentaivideo', 'hentaimp4']
jarsepay.premium = true

export default jarsepay

async function hentaiVideo(page) {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 1153)
        axios.get('https://sfmcompile.club/page/' + page)
            .then((data) => {
                const $ = cheerio.load(data.data)
                const hasil = []
                $('#primary > div > div > ul > li > article').each(function(a, b) {
                    hasil.push({
                        title: $(b).find('header > h2').text(),
                        link: $(b).find('header > h2 > a').attr('href'),
                        category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                        share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                        views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                        type: $(b).find('source').attr('type') || 'image/jpeg',
                        video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                        video_2: $(b).find('video > a').attr('href') || ''
                    })
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}