import wibusoft from 'wibusoft' 
import db from '../lib/database/index.js'
  
 let handler = async (m, { conn, command, text }) => { 
    let user = await db.users.get(m.sender)
 if (!user.royalpass || user.royalpass < 1) {
 throw royals
}
   if (command == "hentairandom") { 
   let json = await wibusoft.anime.randomHentai() 
   let img = json[Math.floor(Math.random() * json.length)] 
   await conn.sendFile(m.chat, img, text, img, m) 
   } 
    
   if (command == "hentaisd") { 
   if (!text) throw "⌕ Contoh: .hentaisd Asuna Yuuki" 
   let json = await wibusoft.anime.getCharacterHentaiByNameAndGetRawURL(text) 
   let img = json[Math.floor(Math.random() * json.length)] 
   await conn.sendFile(m.chat, img, text, img, m) 
   } 
    
   if (command == "hentaihd") { 
   if (!text) throw "⌕ Contoh: .hentaihd Asuna Yuuki" 
   const json = await wibusoft.anime.getCharacterHentaiByName(text) 
   let jangan = json[Math.floor(Math.random() * json.length)] 
   let img = await wibusoft.anime.getUrl(jangan) 
   await conn.sendFile(m.chat, img, text, img, m) 
   } 
  
  
} 
handler.help = ['hentaisd', 'hentaihd']
handler.tags = ['nsfw','premium']
handler.command = /^hentai(random|h(ot|d)|sd)$/i 

handler.premium = true

export default handler