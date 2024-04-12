import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let url = await fetch("https://api.zahwazein.xyz/randomtext/jawaquote?apikey=zenzkey_460317d8125a")
  let res = await url.json()
  
  conn.reply(m.chat, res.result.message, m)
}

handler.help = ['jawa']
handler.tags = ['quotes']
handler.command = /^jawa|quotesjawa$/i

export default handler