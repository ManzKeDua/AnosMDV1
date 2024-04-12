import cheerio from 'cheerio'; 
 import fetch from 'node-fetch'; 
  
 let handler = async (m, { 
     conn, 
     args, 
     usedPrefix, 
     text, 
     command 
 }) => { 
  
     let lister = [ 
         "cari", 
         "baca" 
     ] 
  
     let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|") 
     if (!lister.includes(feature)) return m.reply("*⌕ Contoh:*\n.dongeng cari|malin\n\n*Pilih tipe yang ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n")) 
  
     if (lister.includes(feature)) { 
  
         if (feature == "cari") { 
         if (!inputs) return m.reply("⌕ Contoh: .dongeng cari|kancil")
             try { 
                 let res = await searchDongeng(inputs) 
                 let teks = res.map((item, index) => { 
                     return `*⌕ H A S I L ${index + 1}* 
  
◦ Judul: ${item.entryTitle} 
◦ Link: ${item.link} 
◦ Ringkasan: ${item.entrySummary} 
   ` 
                 }).filter(v => v).join("\n\n________________________\n\n") 
                 await m.reply(teks) 
             } catch (e) { 
                 await m.reply(eror) 
             } 
         } 
  
         if (feature == "baca") { 
             if (!inputs) return m.reply("⌕ Contoh: .dongeng baca|linknya")
             try { 
                 let item = await readDongeng(inputs) 
                 let cap = `*⌕ H A S I L*
  
◦ *Judul:* ${item.title} 
◦ *Thumbnail:* ${item.image} 
◦ *Kategori:* ${item.cat} 
◦ *Tag:* ${item.tag} 
◦ *Konten:* ${cleanText(item.content)} 
◦ *Nama Penulis:* ${item.author} 
◦ *Tanggal:* ${item.date} 
 ` 
                 await conn.sendFile(m.chat, item.image || logo, "", cap, m) 
  
             } catch (e) { 
                 await m.reply(eror) 
             } 
         } 
     } 
 } 
 handler.help = ["dongeng"] 
 handler.tags = ["internet"] 
 handler.command = /^(dongeng)$/i 
 export default handler 
  
 /* New Line */ 
  
 function cleanText(html) { 
     const regex = /<[^>]+>/g; 
     return html.replace(regex, ""); 
 } 
  
 async function searchDongeng(q) { 
   try { 
           const url = 'https://dongengceritarakyat.com/?s=' + q; // Ganti dengan URL halaman web yang ingin Anda crawl 
     const response = await fetch(url); 
     const body = await response.text(); 
     const $ = cheerio.load(body); 
     const results = []; 
  
     $('article').each((index, element) => { 
       const article = $(element); 
       const result = { 
         entryTitle: article.find('.entry-title a').text(), 
         link: article.find('.entry-title a').attr('href'), 
         imageSrc: article.find('.featured-image amp-img').attr('src'), 
         entrySummary: article.find('.entry-summary').text(), 
         footerTag: article.find('.cat-links a').text(), 
         from: article.find('.tags-links a').text() 
       }; 
       results.push(result); 
     }); 
  
     return results; 
   } catch (error) { 
     console.error('Error:', error); 
     return []; 
   } 
 }; 
  
 async function readDongeng(url) { 
   const response = await fetch(url); 
   const html = await response.text(); 
   const $ = cheerio.load(html); 
  
   return { 
     image: $('div.featured-image amp-img').attr('src'), 
     title: $('h1.entry-title').text(), 
     date: $('span.posted-date').text(), 
     author: $('span.posted-author a').text(), 
     content: $('div.entry-content').text(), 
     tag: $('span.tags-links a').text(), 
     cat: $('span.cat-links a').text(), 
   }; 
 }