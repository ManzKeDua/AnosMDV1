import db from '../lib/database/index.js'
import Connection from '../lib/connection.js'

let cooldown = 300000
let handler = async (m, { isPrems, conn: _conn, conn, text }) => {
  let user = await db.users.get(m.sender)
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (new Date() - user.lastdungeon < cooldown) throw `Kamu baru saja menjelajahi dungeon. Tunggu selama *${((user.lastdungeon + cooldown) - new Date()).toTimeString()}*`

  // Cek apakah pengguna memiliki setidaknya 1 pet
  if (!user.ant && !user.fox && !user.horse && !user.cat && !user.dog && !user.dragon) {
    throw 'Kamu tidak memiliki pet untuk menjelajahi dungeon'
  }

  // Mendefinisikan poin dari tiap pet
  let petPoints = {
    ant: 0.01,
    fox: 0.2,
    horse: 0.5,
    cat: 0.7,
    dog: 1,
    dragon: 30
  }

  // Menghitung total poin dari semua pet yang dimiliki pengguna
  let totalPoints = 0;
  for (let pet of Object.keys(petPoints)) {
    let petCount = user[pet] || 0;
    let petPoint = petPoints[pet];

    // Mengambil poin secara acak dari 1/2 poin total setiap pet
    let randomPoint = Math.floor(Math.random() * (petCount * petPoint) / 2) + 1;
    totalPoints += randomPoint;
  }


  // Mendefinisikan poin minimal untuk setiap tipe dungeon
  let dungeonDifficulty = {
    easy: {
      minPoints: Math.floor(Math.random() * 5) + 1,
      auricoreMin: 7,
      auricoreMax: 12
    },
    medium: {
      minPoints: Math.floor(Math.random() * 21) + 5,
      auricoreMin: 30,
      auricoreMax: 55
    },
    hard: {
      minPoints: Math.floor(Math.random() * 76) + 25,
      auricoreMin: 100,
      auricoreMax: 150
    }
  }

  // Mendefinisikan peluang untuk setiap tipe dungeon
  let dungeonChances = {
    easy: 0.9,
    medium: 0.09,
    hard: 0.01
  }

  let dungeonType = '' // Variabel untuk menyimpan tipe dungeon
  let cost = 0 // Variabel untuk menyimpan biaya masuk dungeon

  // Mengecek input pengguna untuk memilih level dungeon
  if (text && (text.toLowerCase() === 'mudah' || text.toLowerCase() === 'easy')) {
    dungeonType = 'easy'
    cost = 3
  } else if (text && (text.toLowerCase() === 'sedang' || text.toLowerCase() === 'medium')) {
    dungeonType = 'medium'
    cost = 15
  } else if (text && (text.toLowerCase() === 'sulit' || text.toLowerCase() === 'hard')) {
    dungeonType = 'hard'
    cost = 80
  } else {
    // Jika input pengguna tidak sesuai, atau tidak ada input, maka secara acak memilih tipe dungeon
    let randomNumber = Math.random()
    let currentChance = 0

    for (let dungeon of Object.keys(dungeonChances)) {
      currentChance += dungeonChances[dungeon]
      if (randomNumber < currentChance) {
        dungeonType = dungeon
        break
      }
    }
  }

  // Memeriksa apakah pengguna memiliki cukup coinly untuk masuk dungeon
  if (cost > 0 && (user.coinly || 0) < cost) {
    throw `Coinly kamu tidak cukup untuk masuk dungeon level ${dungeonType}!`;
  }

  // Pengurangan mata uang (coinly) jika dungeon berbayar
  if (cost > 0) {
    await db.users.update(m.sender, (user) => {
      user.coinly = (user.coinly || 0) - cost;
    });
  }
  
  m.reply(`-${cost} 🧭 coinly`)

  let dungeonData = dungeonDifficulty[dungeonType]

  // Memeriksa apakah poin pengguna mencukupi untuk menjelajahi dungeon
  if (totalPoints < dungeonData.minPoints) {
    let damage = Math.floor(Math.random() * 6) + 25

    await db.users.update(m.sender, (user) => {
      user.health = (user.health || 100) - damage;
      user.auricore = Math.max((user.auricore || 0) - (Math.floor(Math.random() * 3) + 1), 0);

      // Kemungkinan 10% bahwa salah satu pet akan mati
      if (Math.random() < 0.1) {
        let pets = ['ant', 'fox', 'horse', 'cat', 'dog', 'dragon']
        let deadPet = pets[Math.floor(Math.random() * pets.length)]
        user[deadPet] = 0
      }
    });
	
    let auricore_before = user.auricore
    user = await db.users.get(m.sender)
    
    throw `Pet kamu tidak cukup kuat melawan monster di dungeon ${dungeonType}! Kamu menerima serangan ${damage} health 🩸\n\nSelain itu, kamu kehilangan ${auricore_before - user.auricore} auricore`;
  }

  // Jika berhasil menjelajahi dungeon, pengguna mendapatkan auricore secara acak
  let auricore = Math.floor(Math.random() * (dungeonData.auricoreMax - dungeonData.auricoreMin + 1)) + dungeonData.auricoreMin

  // Menambahkan auricore yang didapatkan ke dalam inventori pengguna
  await db.users.update(m.sender, (user) => {
    user.auricore = (user.auricore || 0) + auricore;
  });

  let message = `Kamu berhasil menjelajahi dungeon ${dungeonType} dan mendapatkan ${auricore} auricore sebagai hadiah! 💰\n\n`;
  message += `💼 Auricore saat ini: ${user.auricore || 0}`;
  
  await db.users.update(m.sender, (user) => {
      user.lastdungeon = new Date() * 1;
  });
    
  conn.reply(m.chat, message, m);
}
handler.help = ['dungeon']
handler.tags = ['adventure']
handler.command = /^dungeon$/i

handler.cooldown = cooldown

export default handler