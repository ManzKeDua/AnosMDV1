import db from '../lib/database/index.js'

let handler = async (m, { conn, usedPrefix }) => {
	let user = await db.users.get(m.sender)
	if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
	let cap = `*━━━ ❨ Revolution Case Inventory ❩ ━━┄┈*

@${m.sender.split`@`[0]} *Skins*

*≡ (Covert) Ancient Weapon 🔥*
○ AK47-HeadShot : ${user.AK47HeadShot}
○ M4A4-Temukau : ${user.M4A4Temukau}

*≡ (Classified) Legendary Weapon*
○ P2000-WickedSick : ${user.P2000WickedSick}
○ AWP-Duality : ${user.AWPDuality}
○ UMP45-WildChild : ${user.UMP45WildChild}

*≡ (Restricted) Mythical Weapon*
○ R8Revolver-BananaCannon : ${user.R8RevolverBananaCannon}
○ P90-Neoqueen : ${user.P90Neoqueen}
○ M4A1S-EmphorosaurS : ${user.M4A1SEmphorosaurS}
○ Glock18-UmbralRabbit : ${user.Glock18UmbralRabbit}
○ MAC10-Sakkaku : ${user.MAC10Sakkaku}

*≡ (Mil-Spec) Rare Weapon*
○ MP5SD-Liquidation : ${user.MP5SDLiquidation}
○ MAG7-Insomnia : ${user.MAG7Insomnia}
○ Tec9-Rebel : ${user.Tec9Rebel}
○ SG553-Cyberforce : ${user.SG553Cyberforce}
○ SCAR20-Fragments : ${user.SCAR20Fragments}
○ P250-Rebuilt : ${user.P250Rebuilt}
○ MP9-Featherweight : ${user.MP9Featherweight}`

	conn.reply(m.chat, cap, m, { mentions: await conn.parseMention(cap) } )
}

handler.help = ['myskin']
handler.tags = ['csgo']
handler.command = /^(myskin)$/i

export default handler