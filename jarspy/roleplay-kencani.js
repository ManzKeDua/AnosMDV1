import { googleImage, pinterest } from '@bochilteam/scraper';
import db from '../lib/database/index.js';

const cooldown = 3600300;

let handler = async (m, { conn, text, usedPrefix }) => {
    let user = await db.users.get(m.sender);

    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (new Date() - user.lastkencani < cooldown) {
        throw `Kamu sudah berkencan sebelumnya. Tunggu selama *${((user.lastkencani + cooldown) - new Date()).toTimeString()}* untuk berkencan lagi!`;
    }

    if (user.husbu == '-') {
        throw 'Kamu belum mempunyai husbu! Ketik */lamarhusbu* dan pilih husbumu'
      return
    }
    
    let tempat = `${['pantai', 'taman kota', 'kebun binatang', 'taman bermain', 'kolam renang', 'teater', 'pusat seni dan budaya', 'museum seni', 'pusat sains', 'perpustakaan', 'kafe', 'restoran', 'kebun bunga', 'taman anggur', 'lapangan golf', 'lapangan tenis', 'pusat perbelanjaan', 'pasar seni', 'galeri seni', 'pertunjukan musik', 'lapangan bola basket', 'lapangan baseball', 'lapangan sepak bola', 'pusat yoga', 'karaoke', 'kebun buah', 'pertunjukan seni', 'arena balap', 'pusat bowling'].getRandom()}`
    let alesan = `${['belajar bersama tentang cinta', 'merayakan momen-momen penting bersama', 'berbagi hobi dan minat bersama', 'menguatkan hubungan', 'bersenang senang bersama', 'mempererat komunikasi', 'merayakan hubungan', 'membangun kenangan', 'mempererat hubungan'].getRandom()}`
    let tempat2 = `${['rumah mertua', 'pusat seni kuliner', 'studio musik', 'pesta seni pertunjukan', 'pesta seni kreatif', 'studio perhiasan', 'pusat seni keramik', 'pusat seni berkebun', 'arena konser', 'studio lukisan', 'pusat seni film', 'pusat hiking indoor', 'pemandian air panas', 'memancing', 'kebun apel', 'pusat mainan', 'taman bermain air', 'lapangan futsal'].getRandom()}`
    let alesan2 = `${['saling mengenal lebih baik', 'membangun ikatan emosional yang lebih dalam', 'bersenang senang bersama', 'mempererat komunikasi', 'merayakan hubungan', 'membangun kenangan', 'mempererat hubungan'].getRandom()}`
    let perasaan = `${['senang', 'semakin cinta denganmu', 'sangat cinta denganmu', 'biasa saja', 'sangat senang', 'bahagia', 'sangat bahagia', 'cukup senang'].getRandom()}`
    let gaun = `${['blazer & celana pendek yang bergaya', 'blouse & rok yang anggun', 'jeans & blus yang kasual', 'kimono yang indah', 'yukata yang sangat cantik', 'gaun pendek yang elegan', 'gaun panjang yang anggun', 'kemeja & celana panjang yang rapih', 'crop top & rok mini'].getRandom()}`
    let gift = `${['seikat bunga matahari kuning cerah', 'sebuah coklat', 'sebuah kartu ucapan'].getRandom()}`
    let tempat3 = `${['taman bermain. Mereka tertawa dan bersenang-senang seperti anak-anak, naik roller coaster, dan bermain permainan karnaval', 'restoran. Mereka menikmati hidangan yang begitu lezat dan mereka saling menyuap-nyuapi dengan sangat romantis', 'sebuah kafe yang nyaman. Mereka duduk di sudut yang tenang, berbagi coklat panas dan kue'].getRandom()}`

    let husbu = `${user.husbu}`
    let kapital = capitalizeFirstLetter(husbu)
// Delay Setiap 15 Detik Agar Tidak Terdeteksi Spam
                     setTimeout(() => {
                     conn.reply(m.chat, `*Jam 07:00 Pagi*

⋄ Pagi yang cerah menyapa ${kapital} dan ${user.nama}. Mereka berdua telah merencanakan kencan spesial ini dengan penuh antusiasme. ${kapital} bangun lebih awal untuk bersiap-siap. Dia memakai ${gaun} dan tersenyum senang.`, m)}, 1500);
                     
                     setTimeout(() => {
                     conn.reply(m.chat, `*Jam 07:15 Pagi*

⋄ Sementara itu, ${kapital} sudah bersiap di luar rumah ${user.nama}. Dia membawa ${gift} untuk ${user.nama}. Saat ${user.nama} melihat ${kapital}, senyum mereka bertemu dan mata mereka bersinar.`, m)}, 27000);
                     
                     setTimeout(() => {
                     conn.reply(m.chat, `*Jam 07:30 Pagi*

⋄ Keduanya memutuskan untuk pergi ke ${tempat} untuk ${alesan}. Mereka berjalan berdua, berbicara tentang segala hal, dari hobi mereka hingga impian masa depan. Setiap jalanan dipenuhi dengan bunga-bunga yang berwarna-warni, seperti perasaan mereka satu sama lain.`, m)}, 55000);
                     
                     setTimeout(() => {
                     conn.reply(m.chat, `*Jam 08:00 Pagi - 15:00 Siang*

⋄ Setelah menikmati ${tempat}, ${user.nama} dan ${kapital} pergi ke ${tempat2} untuk ${alesan2}. Mereka saling memandang dengan penuh kasih sayang, merasakan ikatan mereka semakin kuat.`, m)}, 75000);
                     
                     setTimeout(() => {
                     conn.reply(m.chat, `*Jam 15:00 Siang - 22:00 Malam*

⋄ Kencan mereka berlanjut ke ${tempat3}. Hingga malam pun datang begitu cepat, dan mereka merencanakan untuk menonton bintang-bintang bersama.`, m)}, 95000);
                     
                     setTimeout(() => {
                     conn.reply(m.chat, `*Jam 22:00 Malam*

⋄ Di malam yang tenang, mereka berdua duduk di bawah langit yang penuh dengan bintang. ${kapital} merangkul ${user.nama} dengan lembut, dan mereka saling berbagi cerita dan impian mereka. Waktu berlalu begitu cepat, dan kencan pun telah selesai. ${kapital} mengantar ${user.nama} pulang kerumah dan ${user.nama} merasa ${perasaan} dari kencan tadi.

+1 💘 Kepercayaan ${kapital}
+2 ✤ G Money
+10 🪙 Coinly
+1 ⛲ Luxury`.trim(), m)}, 115000);
         
        setTimeout(() => {                         
        db.users.update(m.sender, (userData) => {        
        userData.husbuexp += 1;
        userData.gmoney += 2;
        userData.coinly += 10;
        userData.luxury += 1;
        userData.lastkencani = new Date() * 1;
    })}, 75000);
};

handler.help = ['kencani'];
handler.tags = ['roleplay'];
handler.command = /^(kencani)$/i;

handler.cooldown = cooldown;

export default handler;

function capitalizeFirstLetter(str) {
  // Memisahkan string menjadi array kata-kata
  let words = str.split(" ");
  
  // Loop melalui setiap kata
  for (let i = 0; i < words.length; i++) {
    // Ubah huruf pertama dalam setiap kata menjadi besar
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  
  // Gabungkan kembali kata-kata menjadi satu string
  return words.join(" ");
}