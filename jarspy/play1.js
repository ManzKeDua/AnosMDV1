import axios from 'axios'

const manz = async (m, { conn, text }) => {
if (!text) return m.reply(`Masukan query!`)
var manzz = await axios.get("https://apiaku.vercel.app/play?query=" + text)
conn.sendMessage(m.chat,{image:{url: manzz.data.thumb},caption: `*Judul:* ${manzz.data.title}\n*Channel:* ${manzz.data.channel}\n*Post:* ${manzz.data.published}\n*Views:* ${manzz.data.views}`},{quoted: m})
conn.sendMessage(m.chat,{ audio: {url: manzz.data.url}, fileName: "ManzZ.mp3", mimetype: "audio/mp3"},{quoted: m})
}

manz.command = manz.help = ["play1"]
manz.tags = ["downloader"]

export default manz