import fetch from 'node-fetch' 
 let handler = async (m, { 
     usedPrefix, 
     command 
 }) => { 
     await m.react('🕑')
     try { 
         let response = await fetch('https://al-quran-8d642.firebaseio.com/data.json') 
         let data = await response.json() 
         let teks = data.map((item, index) => { 
             return `*⌕ H A S I L ${index + 1}* 
  
◦ *Arti:* ${item.arti} 
◦ *Asma:* ${item.asma} 
◦ *Audio:* ${item.audio} 
◦ *Ayat:* ${item.ayat} 
◦ *Keterangan:* ${item.keterangan.replace(/<[^>]+>/g, '')} 
◦ *Nama:* ${item.nama} 
◦ *Nomor:* ${item.nomor} 
◦ *Rukuk:* ${item.rukuk} 
◦ *Tipe:* ${item.type} 
◦ *Urut:* ${item.urut} 
 ` 
         }).filter(v => v).join("\n\n________________________\n\n") 
  
         await m.reply(teks) 
     } catch (e) { 
         try { 
             let f = await fetch(`https://api.alquran.cloud/v1/surah`) 
             let xx = await f.json() 
             let teks = xx.data.map((item, index) => { 
                 return `*⌕ H A S I L ${index + 1}* 
  
◦ *English:* ${item.englishName} 
◦ *Arti:* ${item.englishNameTranslation} 
◦ *Nama:* ${item.name} 
◦ *Nomor:* ${item.numberOfAyahs} 
◦ *Tipe:* ${item.type} 
 ` 
             }).filter(v => v).join("\n\n________________________\n\n") 
  
             await m.reply(teks) 
         } catch (e) { 
             await m.reply(eror) 
         } 
     } 
  
 } 
 handler.help = ['daftarsurah'] 
 handler.tags = ['internet'] 
 handler.command = /^((list|daftar)sura(t|h))$/i 
 export default handler