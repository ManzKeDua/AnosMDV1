let handler = async (m, { conn, text, usedPrefix, command }) => {
    let lthb = `
◈===================◈
· 1K (Thousand) ➜ 10³
· 1M (Million) ➜ 10⁶
· 1B (Billion) ➜ 10⁹
· 1T (Trillion) ➜ 10¹²
· 1Qa (Quadrillion) ➜ 10¹⁵
· 1Qi (Quintillion) ➜ 10¹⁸
· 1Sx (Sextillion) ➜ 10²¹
· 1Sp (Septillion) ➜ 10²⁴
· 1Oc (Octillion) ➜ 10²⁷
· 1N (Nonillion) ➜ 10³⁰
· 1Dc (Decillion) ➜ 10³³
· 1Ud (Undecillion) ➜ 10³⁶
· 1Dd (Duodecillion) ➜ 10³⁹
· 1Td (Tredecillion) ➜ 10⁴²
· 1Qua (Quattuordecillion) ➜ 10⁴⁵
· 1Qui (Quindecillion) ➜ 10⁴⁸
· 1Sxd (Sexdecillion) ➜ 10⁵¹
· 1Spd (Septendecillion) ➜ 10⁵⁴
· 1Ocd (Octodecillion) ➜ 10⁵⁷
· 1NoD (Novemdecillion) ➜ 10⁶⁰
· 1Vg (Vigintillion) ➜ 10⁶³
◈===================◈
`.trim()
m.reply(lthb)
}

handler.help = ['listmoney', 'listuang']
handler.tags = ['list']

handler.command = /^(listuang|listmoney|listdigit)/i

export default handler