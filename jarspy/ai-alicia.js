let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} halo`
m.reply(wait)
try {
let gpt = await (await fetch(`https://itzpire.site/ai/botika?q=${text}&user=${m.sender}&model=alicia`)).json()
m.reply("*[ ALICIA - AI ]* " + '\n' + gpt.result)
 } catch(e) {
 throw "`*Gpt Not Responded*`"
}
}
handler.help = ["alicia"].map(a => a + " *[question]*")
handler.tags = ["ai"]
handler.command = ["alicia"]

export default handler