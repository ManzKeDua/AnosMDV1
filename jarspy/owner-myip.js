let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    import http from 'http';

    http.get({
        'host': 'api.ipify.org',
        'port': 80,
        'path': '/'
    }, function(resp) {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', function(chunk) {
            data += chunk;
        });

        // The whole response has been received.
        resp.on('end', function() {
            conn.reply(m.chat, "🔎 My public IP address is: " + data.trim(), m);
        });
    }).on("error", function(err) {
        console.error(err);
        conn.reply(m.chat, "Error fetching IP address", m);
    });
};

handler.help = ['myip'];
handler.tags = ['owner'];
handler.owner = true;
handler.command = /^myip$/i;
export default handler;