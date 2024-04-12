import fetch from 'node-fetch'

let manz = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `‣ Example: ${usedPrefix + command} Midnight in Tokyo`

    try {

        const data = await fetch(`https://ultimetron.guruapi.tech/gpt4?prompt=${text}`)
        const res = await data.json()
        
        if (!res.result.success == true) {
          throw 'Terjadi kesalahan.'
        }

        conn.reply(m.chat, res.result.reply, m)

    } catch (error) {
        console.log(error)
        conn.reply(m.chat, 'Error: ' + error.message, m)
    }
}

manz.help = ['gpt4']
manz.tags = ['ai']
manz.command = ['gpt4']

manz.limit = true

export default manz