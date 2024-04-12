import fs from 'fs'
import syntaxError from 'syntax-error'
import path from 'path'
import Connection from '../lib/connection.js'

const _fs = fs.promises

let handler = async (m, { conn, text, usedPrefix, command, __dirname }) => {
    if (m.sender === `${global.nomorowner}@s.whatsapp.net` || m.sender === `${global.nomorowner}@s.whatsapp.net`) {
    if (!text) throw `
Penggunaan: ${usedPrefix}${command} <name file>
Contoh: ${usedPrefix}getfile main.js
        ${usedPrefix}getplugin owner
`.trim()
    if (/p(lugin)?/i.test(command)) {
        const filename = text.replace(/jarspy(s)\//i, '') + (/\.js$/i.test(text) ? '' : '.js')
        const pathFile = path.join(__dirname, filename)
        const file = await _fs.readFile(pathFile, 'utf8')
        m.reply(file)
        const error = syntaxError(file, filename, {
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true
        })
        if (error) {
            await m.reply(`
*[ ! ]* Kesalahan ditemukan di *${filename}*:
\`\`\`
${error}
\`\`\`
`.trim())
        }

    } else {
        const isJavascript = /\.js/.test(text)
        if (isJavascript) {
            const file = await _fs.readFile(text, 'utf8')
            m.reply(file)
            const error = syntaxError(file, text, {
                sourceType: 'module',
                allowReturnOutsideFunction: true,
                allowAwaitOutsideFunction: true
            })
            if (error) {
                await m.reply(`
*[ ! ]* Kesalahan ditemukan di *${text}*:
\`\`\`
${error}
\`\`\`
`.trim())
            }
        } else {
            const file = await _fs.readFile(text, 'base64')
            await m.reply(Buffer.from(file, 'base64'))
        }
    }
    return
 }
  await conn.reply(m.chat, `Fitur ini hanya dapat digunakan oleh Owner Utama`, m)
}
handler.help = ['getjarspy']
handler.tags = ['owner']
handler.command = /^g(et)?(p(lugin)?|f(ile)?)$/i

export default handler