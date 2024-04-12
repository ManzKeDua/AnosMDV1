import fetch from 'node-fetch'
import db from '../lib/database/index.js'
import { promises } from 'fs'
import fs from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import { plugins } from '../lib/plugins.js'
import { getUserCache } from './_cache.js';
let tags = {
  'jadibot': 'Jadibot',
}
const defaultMenu = {
  before: `
*MENU JADIBOT*
`.trimStart(),
  header: `╭───[ *%category* ]────`,
  body: `│◦ %cmd %isPremium %islimit`,
  footer: `╰─────────────────···`,
  after: ``,
}
let handler = async (m, { args, conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let user = await db.users.get(m.sender)
    let { exp = "-", limit = "-", level = "-", role = "-" } = user || {};
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString('id-ID', { weekday: 'long', timeZone: 'Asia/Jakarta' })
    let date = d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    
    
    //waktu
    let options = {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: 'Asia/Jakarta'
    };
    let time = d.toLocaleTimeString('id-ID', options).replace(/\./g, ':');
    let jam = parseInt(time.slice(0, 2));
    if (jam < 12) {
      time = time.concat(' WIB');
    } else {
      time = time.concat(' WIB');
    }
    time = time.concat(' (+', d.getSeconds(), ' Detik)');
    //waktu  
      
      
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)

    let totalreg = getUserCache().length;

    let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
          }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
  if (!who) {
    who = m.sender;
  }
  /*let doc = {
  video: {
    url: 'https://telegra.ph/file/156c8dea50b60f926ac42.mp4'
  },
  mimetype: "video/mp4",
  fileLength: fsizedoc,
  caption: text,
  gifPlayback: true,
  gifAttribution: 1,
  contextInfo: {
    externalAdReply: {
      showAdAttribution: true,
      mediaType: 1,
      title: wmt,
      body: wm,
      thumbnailUrl: logo.getRandom(),
      renderLargerThumbnail: true,
      sourceUrl: sgc
    }
  },
}
await conn.sendMessage(m.chat, doc, { quoted: m })*/
conn.sendMessage(m.chat, {
     text: text,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: wmt,
     body: wm,
     mediaType: 1,
     sourceUrl: sgc,
     thumbnailUrl: 'https://telegra.ph/file/c0ceaf4c7a81352b5b195.jpg',
     renderLargerThumbnail: true
     }}}, { quoted: m })
    /*conn.sendMessage(m.chat, {
            document: fs.readFileSync("./picture/jarspy.pdf"),
            fileName: wmt,
            mimetype: "application/pdf",
            fileLength: fsizedoc,
            pageCount: "2023",
            caption: text,
            mention: [m.sender],
            contextInfo: {
              forwardingScore: '9999999',
              externalAdReply: {
                mediaType: 1,
                mediaUrl: logo.getRandom(),
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: sgc,
                thumbnailUrl: logo.getRandom(),
                title: wm, 
                body: wm,
              },
            },
          }, { quoted: m });*/
  } catch (e) {
      conn.reply(m.chat, "*Menu sedang error*", m)
      throw e
  }
}
handler.help = ['menujadibot']
handler.tags = ['menu']
handler.command = /^(jadibotmenu|menujadibot)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}