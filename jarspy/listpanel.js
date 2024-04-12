import fetch from 'node-fetch'

var manz = async(m, { conn }) => {
var teks = `【🏷 *Pricelist Pannel*】
- 1GB CPU 40% = 1.500,00 IDR
- 2GB CPU 60% = 2.500,00 IDR
- 3GB CPU 80% = 3.500,00 IDR
- 4GB CPU 110% = 4.500,00 IDR
- 5GB CPU 140% = 5.500,00 IDR
- UNLI CPU UNLI = 7.000,00 IDR
⊶  *DETAIL INFORMATION* ⊶ 
❱❱ Normal Server
❱❱ Vps 8 GB 4Core
❱❱ Full Garansi
┉┉┉┉┉┉┉┉┉┉┉┉┉
 【🏷 *Pricelist Pannel Private*】
- 1GB CPU 30% = 2.500,00 IDR
- 2GB CPU 60% = 3.500,00 IDR
- 3GB CPU 80% = 4.500,00 IDR
- 4GB CPU 90% = 5.500,00 IDR
- 5GB CPU 100% = 6.500,00 IDR
- 6GB CPU 110% = 7.500,00 IDR
- 7GB CPU 120% = 8.500,00 IDR
- 8GB CPU 130% = 9.500,00 IDR
- UNLI CPU UNLI = 12.000,00 IDR
⊶ *DETAIL INFORMATION* ⊶ 
❱❱ Private Server
❱❱ Vps 8 GB 4Core
❱❱ Anti Maling Sc
❱❱ Server Fast Anti Rusuh
❱❱ Full Garansi

【 *PRICELIST JASA MANZKENZ* 】

- JADIBOT
- SEWABOT
- JASA INSTALL PANEL
- JASA RECODE SC
- JASA FIX SC EROR

❱❱❱❱❱❱ *Manz* ❰❰❰❰❰❰

📪 *_Contact Owner_*
wa.me/62889897216271
Group Bot
https://chat.whatsapp.com/EGCYoCMmvQ2FGNcLNOjYyj
`.trim()
  m.reply(teks)
}

manz.tags = ['main']
manz.command = manz.help = ['listpanel']
export default manz