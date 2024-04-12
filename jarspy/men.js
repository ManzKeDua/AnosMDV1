let handler = async (m, { conn }) => {
   let text = `ʜᴀɪ ᴋᴀᴋ
*ᴀɴᴏꜱ* ᴀᴅᴀʟᴀʜ ꜱᴇʙᴜᴀʜ ʙᴏᴛ ʏᴀɴɢ ʙᴇʀꜰᴏᴋᴜꜱ ᴜɴᴛᴜᴋ ᴘᴇᴍʙᴜᴀᴛᴀɴ ʀᴏʟᴇᴘʟᴀʏ ɢᴀᴍᴇ, ᴅᴇɴɢᴀɴ ᴛᴜᴊᴜᴀɴ ᴍᴇɴɪɴɢᴋᴀᴛᴋᴀɴ ᴘᴏᴘᴜʟᴀʀɪᴛᴀꜱ ᴘᴀᴅᴀ ʙᴏᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ʀᴘɢ.

‣ ᴋᴇᴛɪᴋ *.ᴀʟʟ* ᴜɴᴛᴜᴋ ᴍᴇʟɪʜᴀᴛ ꜱᴇʟᴜʀᴜʜ ᴘᴇʀɪɴᴛᴀʜ ʏᴀɴɢ ᴛᴇʀꜱᴇᴅɪᴀ`
  
conn.sendMessage(m.chat, {
     text: text,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: wmt,
     body: wm,
     mediaType: 1,
     sourceUrl: sig,
     thumbnailUrl: logo.getRandom(),
     renderLargerThumbnail: false
     }}}, { quoted: m })

}
handler.help = ['help']
handler.tags = ['main']
handler.command = /^(menu|m)$/i

export default handler