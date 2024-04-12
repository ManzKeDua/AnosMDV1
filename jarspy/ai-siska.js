/*####################################

               

              ELAINA - CHAN

             MADE BY MANZKNEZ

       

✅ WhatsApp: wa.me/62889897216271

#####################################*/

let manz = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} halo`
m.reply(wait)
try {
let gpt = await (await fetch(`https://itzpire.site/ai/botika?q=${text}&user=${m.sender}&model=siska`)).json()
m.reply("*[ SISKA- AI ]* " + '\n' + gpt.result)
 } catch(e) {
 throw "`*Gpt Not Responded*`"
}
}
manz.help = ["siska"].map(a => a + " *[question]*")
manz.tags = ["ai"]
manz.command = ["siska"]

export default manz