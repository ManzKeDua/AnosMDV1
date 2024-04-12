let manz = async (m, { conn }) => {
let manz = `*╔═════════════════❑*\n*║      ◆ LIST SEWA BOT ◆*\n*║═════════════════❑*\n*║ ✾  1 Minggu : Rp.7.000*\n*║ ✾  2 Minggu : Rp.14.000*\n*║ ✾  3 Minggu : Rp.15.000*\n*║ ✾  1 Bulan  : Rp.20.000*\n*║ ✾  Permanen : 200.00*\n*╚═════════════════❏*
_Sewa bot bisa memasukkan bot ke grup dan mendapatkan premium jadi bisa akses fitur premium di bot_

*Pembayaran??*
*Dana :* Chat ketik [ .owner ]
*Via pulsa :* nambah 3k [ Lebih Mahal Dikit ]
_Chat ketik_ *[ .owner ]* _untuk membeli fitur premium_
`;

conn.sendMessage(m.chat, {
      text: manz,
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true,
      title: `• List Harga Sewa AnosMD`,
      body: 'Powered By Manz',
      thumbnailUrl: 'https://telegra.ph/file/70795c523bbe5b8f64c7b.jpg',
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, { quoted: m })
}
manz.help = ['sewabot']
manz.tags = ['info']
manz.command = /^(rental|iklan|sewa|sewabot)$/i

export default manz