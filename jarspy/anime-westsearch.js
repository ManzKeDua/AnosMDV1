import fetch from "node-fetch" 
 import cheerio from "cheerio" 
  
 let handler = async (m, { conn, args, text}) => { 
 await m.react('🕑')
                 if (!text) return m.reply("*Masukkan Query/Link Dari WestManga!*") 
         let res = await SearchWest(text) 
         let list = res.map((item, index) => `*⌕ West Search*
  
◦ *Title:* ${item.titles} 
◦ *Link:* ${item.value} 
 `).join("\n") 
     await m.reply(list) 
 } 
 handler.help = ["westsearch"] 
 handler.tags = ["anime"] 
 handler.command = /^(westsearch)$/i 
 handler.limit = true
 
 export default handler 
  
 async function SearchWest(url) { 
 // Array JSON untuk menyimpan hasil ekstraksi 
 const result = [] 
  
 // Fetch halaman web 
  return await fetch("https://westmanga.info/?s=" + url) 
   .then(response => response.text()) 
   .then(data => { 
     // Load HTML dengan Cheerio 
     const $ = cheerio.load(data) 
  
     // Cari semua elemen span dengan class "dlx r" 
     $("div.bsx").each((index, element) => { 
       // Ambil link dari a href pada elemen span saat ini 
       const link = $(element).find("a").attr("href") 
       const titles = $(element).find("a").attr("title") 
          
       // Tambahkan data ke dalam array JSON 
       result.push({ 
         titles: titles, 
         value: link 
       }) 
     }) 
  
     // Tampilkan hasil 
     return result 
   }) 
   }