import Connection from '../lib/connection.js'
import { randomBytes } from 'crypto'
import { areJidsSameUser, jidNormalizedUser } from '@whiskeysockets/baileys'
import ws from 'ws'

let handler = async (m, { conn, text, usedPrefix }) => {
    let chats = Object.entries(Connection.store.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
    const parent = await Connection.conn
    if (!areJidsSameUser(parent.user.id, conn.user.id)) throw false
    const users = [...new Set(
        [...Connection.connections.entries()]
            .filter(([_, { conn }]) => conn.user.jid && !conn.ws.isClosed)
            .map(([_, { conn }]) => conn.user)
    )]
    let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
    let teks = text ? text : cc.text
    for (let id of chats) await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : teks + '\n\n' + '「 ' + author + ' Broadcast 🔊 」\n'), true).catch(_ => _)
    m.reply(`_Berhasil mengirim broadcast ke ${users.length} nomor yang jadi bot_
${users.map(v => 'wa.me/' + v.replace(/[^0-9]/g, '') + `?text=${usedPrefix}menu`).join('\n')}`.trim())
}
handler.help = ['broadcastjadibot', 'bcbot'].map(v => v + '')
handler.tags = ['host']
handler.command = /^(broadcast|bc)(jadi)?bot$/i
handler.rowner = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)