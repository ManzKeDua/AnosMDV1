let handler = async m => {
   let teks = `
1. ᴊᴀɴɢᴀɴ ᴍᴇᴍʙᴀʜᴀs ʜᴀʟ ʏᴀɴɢ ʏᴀɴɢ ʙᴇʀʙᴀᴜ 18+
2. ᴊᴀɴɢᴀɴ sᴘᴀᴍ ʙᴏᴛ
3. ᴊᴀɴɢᴀɴ ᴍᴇɴɢɪʀɪᴍ ᴘᴇsᴀɴ ʏᴀɴɢ ᴍᴇɴɢᴀɴᴅᴜɴɢ ᴜɴsᴜʀ ᴍᴇɴɢʜɪɴᴀ ᴘɪʜᴀᴋ
4. ᴊᴀɴɢᴀɴ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ʙᴀʜᴀsᴀ ʏᴀɴɢ ᴛɪᴅᴀᴋ ʙᴀɪᴋ 
5. ᴊᴀɴɢᴀɴ ᴍᴇɴɢɪʀɪᴍ ᴘᴇsᴀɴ/ғᴏᴛᴏ ʏᴀɴɢ ᴍᴇᴍʙᴜᴀᴛ ᴏʀᴀɴɢ ʟᴀɪɴ ᴍᴇʀᴀsᴀ ᴛɪᴅᴀᴋ ᴇɴᴀᴋ
`
    await conn.sendMessage(m.chat, teks, m, {
        title: 'By ManzKenz',
        body: 'Rules📖',
        largeThumb: true,
        url: 'https://github.com/ManzKeDua'
    })
}
handler.help = ['rulesbot']
handler.tags = ['info']
handler.command = ['rulesbot']
export default handler