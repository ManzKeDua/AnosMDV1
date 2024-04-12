import syntaxerror from 'syntax-error'
import { format } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'
import db from '../lib/database/index.js'
import connection from '../lib/connection.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

let handler = async (m, _2) => {
  let { conn, usedPrefix, noPrefix, args, groupMetadata } = _2
  let _return
  let _syntax = ''
  let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix
  let old = m.exp * 1
  if (m.sender === `${global.nomorowner}@s.whatsapp.net`) {
  try {
    let i = 15
    let f = {
      exports: {}
    }
    let exec = new (async () => { }).constructor('print', 'm', 'handler', 'require', 'conn', 'db', 'store', 'connection', 'Array', 'process', 'args', 'groupMetadata', 'module', 'exports', 'argument', 'getUser', 'updateUser', _text)
    _return = await exec.call(conn, (...args) => {
      if (--i < 1) return
      console.log(...args)
      return conn.reply(m.chat, format(...args), m)
    }, m, handler, require, conn, db, connection.store, connection, CustomArray, process, args, groupMetadata, f, f.exports, [conn, _2], 
                              (id) => db.users.get(id), // getUser
                              (id, fn) => db.users.update(id, fn) // updateUser
      )
  } catch (e) {
    let err = syntaxerror(_text, 'Execution Function', {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      sourceType: 'module'
    })
    if (err) _syntax = '```' + err + '```\n\n'
    _return = e
  } finally {
    conn.reply(m.chat, _syntax + format(_return), m)
    m.exp = old
  }
  return
 }
  await conn.reply(m.chat, `Fitur ini hanya dapat digunakan oleh ${namaowner}`, m)
}
handler.help = ['> ', '=> ']
handler.tags = ['owner']
handler.customPrefix = /^=?> /
handler.command = /(?:)/i

export default handler

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}