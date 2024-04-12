import fs from 'fs'
import axios from 'axios'
const uploadImage = import from '../lib/uploadImage'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    conn.sendMessage(m.chat, {
		react: {
			text: '🕑',
			key: m.key,
		}
	})
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadImage(img);
      m.reply(wait);
      const wa = await axios.get(`https://aemt.me/jadigta?url=${out}`) 
   
        conn.sendMessage(m.chat,{image:{url:wa.data.result},caption:'Nihh Kak >\\<'},{quoted:m})
    } else {
      m.reply(`Send/Reply Images with the caption *.togta*`);
    }
  } catch (e) {
    console.error(e);
    return m.reply(eror)
  } 
}

handler.command = handler.help = ['jadigta','togta'];
handler.tags = ['maker'];
handler.premium = false;
handler.limit = false;

export default handler