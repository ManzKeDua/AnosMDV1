import fetch from "node-fetch";

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Masukkan URL!\n\nContoh:\n${usedPrefix + command} https://open.spotify.com/track/3zakx7RAwdkUQlOoQ7SJRt`;
  if (!args[0].match(/spotify/gi)) throw `URL Tidak Ditemukan!`;
  await m.react('🕑');
  const urll = args[0];
  try {
    const res = await fetch(`https://api.arifzyn.tech/search/spotify?query=${text}&apikey=RexxBotz`);
    let jsons = await res.json();
    const { thumbnail, title, name, duration, url } = jsons.result.data;
    const { id, type } = jsons.result.data.artist;
    let captionvid = ` ∘ Judul: ${title}\n∘ Id: ${id}\n∘ Durasi: ${duration}\n∘ Type: ${type}`;
    let pesan = await conn.sendMessage(m.chat, {
      text: captionvid,
      contextInfo: {
        externalAdReply: {
          title: "",
          body: "Powered by",
          thumbnailUrl: thumbnail,
          sourceUrl: thumbnail,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true,
        },
      },
    });
    /*await conn.sendMessage(
      m.chat,
      { audio: { url: url }, mimetype: "audio/mpeg", contextInfo: {
        externalAdReply: {
          title: title,
          body: "",
          thumbnailUrl: thumbnail,
          sourceUrl: url,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true,
        },
      }},
      { quoted: m }
    );*/
    await conn.sendMessage(m.chat, { audio: { url: url }, mimetype: 'audio/mpeg' }, { quoted: m });
  } catch (e) {
    throw `*Server down!*`;
  }
};

handler.help = ["spotify"];
handler.command = /^(spotify)$/i;
handler.tags = ["downloader", "premium"];
handler.premium = true;
handler.fail = null;
export default handler;