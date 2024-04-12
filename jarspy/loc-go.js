import db from '../lib/database/index.js';

const locations = {
  gym: {
    name: 'gym',
    stat: 'strength',
    multiplier: 'strength_multiplier_extra',
    requirement: { speed: 1000, strength: 10000 }, // Requirement berdasarkan speed dan strength
    message: '*[ ! ]* Selamat datang di gym. Kekuatanmu meningkat 10x.',
    multi: 10,
  },
  dojo: {
    name: 'dojo',
    stat: 'defense',
    multiplier: 'defense_multiplier_extra',
    requirement: { speed: 1500, defense: 12000 }, // Requirement berdasarkan speed dan defense
    message: '*[ ! ]* Selamat datang di dojo. Pertahananmu meningkat 10x.',
    multi: 10,
  },
  psikis: {
    name: 'tempat latihan psikis',
    stat: 'psychic',
    multiplier: 'psychic_multiplier_extra',
    requirement: { speed: 2000, psychic: 15000 }, // Requirement berdasarkan speed dan psychic
    message: '*[ ! ]* Selamat datang di tempat latihan psikis. Kemampuan psikismu meningkat 10x.',
    multi: 10,
  },
  lapangan: {
    name: 'lapangan',
    stat: 'speed',
    multiplier: 'speed_multiplier_extra',
    requirement: { speed: 10000 }, // Requirement hanya berdasarkan speed
    message: '*[ ! ]* Selamat datang di lapangan. Kecepatanmu meningkat 10x.',
    multi: 10,
  },
  puncak: {
    name: 'puncak',
    stat: 'strength',
    multiplier: 'strength_multiplier_extra',
    requirement: { speed: 10000, strength: 100000, car: 1 },
    message: '*[ ! ]* Selamat datang di Puncak Perkasa. Kekuatanmu meningkat 100x.',
    multi: 100,
  },
  benteng: {
    name: 'benteng',
    stat: 'defense',
    multiplier: 'defense_multiplier_extra',
    requirement: { speed: 10000, defense: 100000 },
    message: '*[ ! ]* Selamat datang di Benteng Tangguh. Pertahananmu meningkat 100x.',
    multi: 100,
  },
  awan: {
    name: 'awan',
    stat: 'psychic',
    multiplier: 'psychic_multiplier_extra',
    requirement: { speed: 10000, psychic: 100000 },
    message: '*[ ! ]* Selamat datang di Sumber Psikis. Kemampuan psikismu meningkat 100x.',
    multi: 100,
  },
  kilat: {
    name: 'kilat',
    stat: 'speed',
    multiplier: 'speed_multiplier_extra',
    requirement: { social: 100, speed: 1000000, psychic: 100000 },
    message: '*[ ! ]* Selamat datang di Lintasan Kilat. Kecepatanmu meningkat 100x.',
    multi: 100,
  },
};

const handler = async (m, { usedPrefix, args }) => {
  const user = await db.users.get(m.sender);

  if (args.length !== 1) {
    return m.reply(`
⌕ Contoh Penggunaan: ${usedPrefix}go kilat

⬡ List Tempat ⬡
◦ Gym
◦ Dojo
◦ Psikis
◦ Lapangan
◦ Puncak
◦ Benteng
◦ Awan
◦ Kilat
`.trim());
  }

  const location = args[0].toLowerCase();

  if (location === 'home') {
    if (user.location === 'homebase') {
      return m.reply('*[ ! ]* Kamu sudah berada di homebase.');
    }

    await db.users.update(m.sender, (userData) => {
      userData[locations[userData.location].multiplier] = 1;
      userData.location = 'homebase';
    });

    return m.reply('*[ ! ]* Selamat kembali ke homebase! Statistikmu kembali normal.');
  }

  if (!(location in locations)) {
    return m.reply('*[ ! ]* Tempat yang kamu tuju tidak tersedia. Silakan coba lagi.');
  }

  const { name, stat, multiplier, requirement, message, multi } = locations[location];

  if (user.location === location) {
    return m.reply(`*[ ! ]* Kamu sudah berada di ${name}.`);
  }

  const { speed, strength, defense, psychic } = user;
  const requirementsNotMet = [];

  for (const [reqStat, reqValue] of Object.entries(requirement)) {
    if (user[reqStat] < reqValue) {
      requirementsNotMet.push(`${reqStat}`);
    }
  }

  if (requirementsNotMet.length > 0) {
    const errorMessage = `*[ ! ]* Kamu kurang ${requirementsNotMet.join(', ')} untuk mencapai ${name}!\n\n⌕ Persyaratan: \n`;
    return m.reply(errorMessage + Object.entries(requirement).map(([reqStat, reqValue]) => `◦ ${reqStat} ${toSimple(reqValue)}`).join('\n'));
  }

  await db.users.update(m.sender, (userData) => {
    userData.location = location;
    userData[multiplier] = multi;
  });

  return m.reply(message);
};

handler.help = ['go'];
handler.tags = ['rpg'];
handler.command = /^go$/i;

export default handler;

function toSimple(number) {
  if (isNaN(parseFloat(number))) return number;
  if (parseFloat(number) === 0) return '0';
  number = parseFloat(number).toFixed(0);
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg'];
  const base = 1000;
  const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
  const suffix = suffixes[exponent] || '';
  const simplified = number / Math.pow(base, exponent);
  const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 });
  return formatter.format(simplified) + suffix;
}