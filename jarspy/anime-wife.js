import fetch from 'node-fetch'
import db from '../lib/database/index.js' 
  
 let handler = async (m, { conn, usedPrefix, text, args, command }) => { 
  }
  let cate = `*Kamu Belum Memasukkan Kategorinya*
Cara Penggunaan: *${usedPrefix}${command} raiden-shogun*
Kategori yang tersedia sebagai berikut
  
▢ *Versatile:*
◦ Waifu
◦ Maid
◦ Marin-kitagawa
◦ Mori-calliope
◦ Raiden-shogun
◦ Oppai
◦ Selfies
◦ Uniform`

  if (!text) return conn.sendMessage(m.chat, { text: cate, contextInfo: { externalAdReply: { showAdAttribution: true, title: "Masukkan Kategorinya", body: wm, thumbnailUrl: salah, sourceUrl: sig, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
  
 try {
 let anu = await fetch(`https://api.waifu.im/search?included_tags=${text}`) 
 let data = await anu.json() 
 let foto = data.images[0].url 
 data = data.images.map((v) => `◦ *Signature:* ${v.signature}\n◦ *Extension:* ${v.extension}\n◦ *ID:* ${v.image_id}\n◦ *Favorit:* ${v.favorites}\n◦ *Warna:* ${v.dominant_color}\n◦ *Sumber:* ${v.source}\n◦ *Artist:* ${v.artist}\n◦ *Diunggah:* ${v.uploaded_at}\n◦ *Like:* ${v.liked_at}\n◦ *NSFW:* ${v.is_nsfw}\n◦ *Lebar:* ${v.width}\n◦ *Tinggi:* ${v.height}\n◦ *Ukuran:* ${v.byte_size}`) 
 conn.sendFile(m.chat, foto, 'anu.png', data, m)
 
 } catch (e) {
		console.log(e)
			let cates = `*Kategori Yang Kamu Masukkan Tidak Tersedia*
Kategori yang tersedia sebagai berikut
  
▢ *Versatile:*
◦ Waifu
◦ Maid
◦ Marin-kitagawa
◦ Mori-calliope
◦ Raiden-shogun
◦ Oppai
◦ Selfies
◦ Uniform`
conn.sendMessage(m.chat, { text: cates, contextInfo: { externalAdReply: { showAdAttribution: true, title: "Kategori Salah", body: wm, thumbnailUrl: salah, sourceUrl: sig, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
   }
}
handler.help = ['wife'] 
handler.tags = ['anime'] 
handler.command = /^(wife)$/i 
handler.limit = true
 
export default handler

// Credit by Jarspy