import fetch from 'node-fetch'

let bpink = []
fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/blekping.txt')
    .then(res => res.text())
    .then(txt => bpink = txt.split('\n'))
let jarspy = async (m, { conn }) => {
    let img = bpink[Math.floor(Math.random() * bpink.length)]
    if (!img) throw img
    await conn.sendFile(m.chat, img, '', 'Blackpink', m, 0, { thumbnail: await (await fetch(img)).buffer() })
}
jarspy.help = ['blackpink']
jarspy.tags = ['internet']
jarspy.command = /^(blackpink)$/i

export default jarspy