import db from '../lib/database/index.js';

async function handler(m, { conn, text, args }) {
  if (args.length < 1) return conn.reply(m.chat, 'Silakan masukkan hal yang ingin di request\nFormat: /secret <nomor> <pesan>', m);

  let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : (args[0]) ? (args[0].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
  if (!who) return m.reply('Tag target atau ketik nomornya');

  let user = await db.users.get(m.sender);
  let _user = await db.users.get(who);

  let message = `
Ada pesan rahasia:

${args.slice(1).join(' ')}

◦ _Ketik /balas untuk membalas_
`;
  // let message = `Ada pesan rahasia:\n\n${args.slice(1).join(' ')}\n\nDari: *@${m.sender.split('@')[0]}*`;

  try {
    await conn.reply(who, message.trim(), null, { mentions: [m.sender] });
    conn.reply(m.chat, `Pesan rahasia kamu telah terkirim ke pengguna tersebut \nKe: *@${who.split('@')[0]}*`, m, { mentions: [who] });
    await db.users.update(who, (userData) => {
      userData.reply = m.sender;
    });
  } catch (error) {
    m.reply('Gagal mengirim permintaan, mohon coba lagi nanti.', null);
  }
}

handler.help = ['secret'];
handler.tags = ['utilitas'];
handler.command = /^(secret|reply)$/i;
handler.disabled = false;

export default handler;