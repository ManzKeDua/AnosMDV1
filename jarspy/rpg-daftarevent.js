let handler = async(m, { conn, text }) => { 
     if (!text) throw 'Silahkan isi nama dan alasan mengikuti event' 
         if (text.length > 100) throw 'Maksimal 100 teks' 
             const ownerNumber = `${global.nomorown}@s.whatsapp.net`
             const alasan = `*「 Daftar 」* _Event_ \nNomor : wa.me/${m.sender.split`@`[0]}\nPesan : ${text}`
                     await conn.reply(ownerNumber, alasan, m, { mentions: [m.sender] })
                         m.reply('Permintaan telah dikirim ke owner, silahkan tunggu')  
                         } 
                         handler.help = ['daftarevent'].map(v => v + '') 
                         handler.tags = ['rpg'] 
                         handler.command = /^(daftarevent)$/i 
                         handler.premium = false 
  
                         export default handler