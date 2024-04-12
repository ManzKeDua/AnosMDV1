import axios from "axios";

let handler = async (m, { conn, text, command }) => {
  switch (command) {
    case "lahelu-foto": {
      let { data } = await axios.get(
        "https://lahelu.ptz.fund/random-foto",
        { responseType: "arraybuffer" }
      );
      conn.sendMessage(m.chat, { image: data, mimetype: "image/jpeg" });
    }
    break;
    case "lahelu-search-foto": {
      if (!text) return m.reply("Mau nyari meme apa?");
      let { data } = await axios.get(
        "https://lahelu.ptz.fund/search-foto?q=" + text,
        { responseType: "arraybuffer" }
      );
      conn.sendMessage(m.chat, { image: data, mimetype: "image/jpeg" });
    }
    break;
    case "lahelu-video": {
      let { data } = await axios.get(
        "https://lahelu.ptz.fund/random-video",
        { responseType: "arraybuffer" }
      );
      conn.sendMessage(m.chat, { video: data, mimetype: "video/mp4" });
    }
    break;
    case "lahelu-search-video": {
      if (!text) return m.reply("Mau nyari meme apa?");
      let { data } = await axios.get(
        "https://lahelu.ptz.fund/search-video?q=" + text,
        { responseType: "arraybuffer" }
      );
      conn.sendMessage(m.chat, { video: data, mimetype: "video/mp4" });
    }
    break;
  }
};

handler.help = [
  "lahelu-search-video",
  "lahelu-search-foto",
  "lahelu-video",
  "lahelu-foto",
];
handler.command = [
  "lahelu-search-video",
  "lahelu-search-foto",
  "lahelu-video",
  "lahelu-foto",
];
handler.tags = ["lahelu"];

export default handler;