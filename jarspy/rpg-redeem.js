import db from '../lib/database/index.js'

let handler = async (m, {
    conn,
    args,
    usedPrefix
}) => {
    const sender = m.sender
    const user = await db.users.get(sender);
    const today = new Date().toLocaleDateString();
    const cooldownDuration = 86400000; // 1 day in milliseconds

    // Merge codes from conn.freegift[m.sender].code array with validGiftCodes (removing duplicates)
    const validGiftCodes = [
        ...new Set([
            'manzgay99',
            'followjarsepay',
            'BloowwXx',
            'BbL016JJQBCSr54OwwW0',
            'giftkey01389320007',
            'kode013923',
            ...(conn.freegift && conn.freegift[m.sender] && conn.freegift[m.sender].code ? conn.freegift[m.sender].code : [])
        ])
    ];

    if (conn.freegift && conn.freegift[m.sender] && conn.freegift[m.sender].time === today) {
        const remainingCooldown = user.lastgift + cooldownDuration - new Date();
        const remainingTime = getRemainingTime(remainingCooldown);

        return conn.reply(m.chat, `🎁 Kamu sudah menggunakan kode redeem hari ini. Tunggulah beberapa saat lagi.\nKetik *${usedPrefix}buyredeem* untuk membeli kode redeem premium`, m);
    }

    if (!args[0]) {
        return conn.reply(m.chat, `❓ Kamu belum memasukkan kode redeem!\n\nContoh: *${usedPrefix}redeem code*`, m);
    }

    if (validGiftCodes.includes(args[0])) {
        conn.reply(m.chat, '*🎉 SELAMAT!*\nKamu telah mendapatkan:\n💠 10.000.000 XP\n🎫 10.000 Limit\n💹 1.000.000.000 Money\n🥤 50 Potion\n\nSpecial Gift:\n🔥 Random Times Premium', m);
        await db.users.update(m.sender, (user) => {
        user.exp += 10000000;
        user.limit += 10000;
        user.money += 1000000000;
        user.potion += 50;
        })
        
        global.prems.push(`${sender.split`@`[0]}`)

        // Set the session to mark that the user has used the gift code today
        if (!conn.freegift) conn.freegift = {};
        conn.freegift[m.sender] = {
            time: today
        };

        // Set timeout for gift code usage (1 day)
        setTimeout(() => {
            delete conn.freegift[m.sender];
            conn.reply(m.chat, '⏰ Waktunya menggunakan kode redeem lagi!\nKetik *redeem* untuk mendapatkan hadiah spesial.', m);
        }, cooldownDuration);
    } else {
        conn.reply(m.chat, `*❌ KODE REDEEM TIDAK VALID  ❌*\nSilakan periksa kembali kode redeem yang kamu masukkan.\n\nContoh: *${usedPrefix}redeem code*`, m);
    }
};

handler.help = ['redeem'];
handler.tags = ['rpg'];
handler.command = /^redeem$/i;

export default handler;

function getRemainingTime(ms) {
    let days = Math.floor(ms / 86400000);
    let hours = Math.floor((ms % 86400000) / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);

    let remainingTime = '';
    if (days > 0) remainingTime += `${days} hari `;
    if (hours > 0) remainingTime += `${hours} jam `;
    if (minutes > 0) remainingTime += `${minutes} menit `;
    if (seconds > 0) remainingTime += `${seconds} detik`;

    return remainingTime.trim();
}