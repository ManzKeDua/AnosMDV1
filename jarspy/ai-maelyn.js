import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply("Mau nanya apa kak?")
    
    try {
        const query = text.trim()
        const response = await MaelynAI(query)

        m.reply(response);
    } catch(e) {
        console.error(e)
        throw "`*Command Not Responded*`"
    }
}

handler.help = ["maelyn"]
handler.tags = ["ai"]
handler.command = ["maelyn"]

export default handler

async function MaelynAI(query) {
    try {
        const response = await axios.post('https://bing.maelyn.my.id/chat', {
            query: query
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}