import axios from 'axios'
import uploadImage from '../lib/uploadImage.js'

var danz = async (m, { conn, usedPrefix, command, text }) => {
var q = m.quoted ? m.quoted : m
var mime = (q.msg || q).mimetype || ''
if (!mime) return m.reply(`Kirim/Balas gambar dengan caption ${usedPrefix + command}`)
m.reply(wait)
var media = await q.download()
var url = await uploadImage(media)
var hasil = await img2prompt(url)
await m.reply(hasil.data)
}

danz.command = danz.help = ['toprompt', 'totext', 'img2prompt']
danz.tags = ['maker']
danz.limit = true

export default danz

async function img2prompt(url) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');

        const payload = {
            "consume_points": 1,
            "image": imageBase64
        };

        const headers = {
            'Content-Type': 'application/json',
            'Cookie': '_ga=GA1.1.1902043976.1711876868; _ga_WQ0WB7ZY96=GS1.1.1711876868.1.1.1711877146.0.0.0',
            'Origin': 'https://animegenius.live3d.io',
            'Referer': 'https://animegenius.live3d.io/',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTIwNDk5MjMsInN1YiI6Imdvb2dsZSAxNTQxODk2IGRhbmlndHBzQGdtYWlsLmNvbSJ9.BCZWkx0bOoBIysgEQ1I9s_DxiTzf2QGc9bEDJ88Qnl0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
        };

        const result = await axios.post('https://api.live3d.io/api/v1/generation/img2prompt', payload, { headers });

        return result.data;

    } catch (error) {
        console.error('Terjadi kesalahan:', error.response ? error.response.data : error.message);
    }
}

/**
  * DannTeam
  * Instagram: @dannalwaysalone
*/