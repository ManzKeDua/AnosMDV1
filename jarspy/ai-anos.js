import axios from 'axios'

const manz = async (m, { conn, text }) => {

  if (!text) return m.reply(`Ada apa?`)
  await conn.sendMessage(m.chat, {
    react: {
      text: '🔎',
      key: m.key,
    },
  });
  
  var mannr = "Anos Voldigoad adalah bot WhatsApp yang terbuat dari ketegasan. Untuk membantu anda dalam mengerjakan dalam hal apapun. Karakter Anos adalah pemberani dan penyayang, Anos Voldigoad diciptakan oleh ManzKenz, usia pencipta Anos Voldigoad adalah 17tahun, dan pencipta Anos Voldigoad tinggal di Kota Surabaya"
  
  let manz = await axios.get(`https://gemini.ptz.fund/api/cai?prompt=${mannr}&text=${text}`)
  await m.reply(manz.data.text)
  
}

manz.command = manz.help = ["anos"]
manz.tags = ["ai"]

export default manz