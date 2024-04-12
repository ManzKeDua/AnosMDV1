let manz = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) throw `‣ Example: ${usedPrefix + command} Tokyo`

    try {
        let result = await blackboxChat(text)
        await conn.reply(m.chat, result, m)
    } catch (error) {
        console.log(error)
        conn.reply(m.chat, 'Error: ' + error.message, m)
    }
}

manz.help = ['blackbox']
manz.tags = ['ai']
manz.command = ['blackbox']

manz.limit = true

export default manz

async function blackboxChat(content) {
    const url = "https://www.blackbox.ai/api/chat"
    const headers = {
        "Accept": "*/*",
        "Accept-Language": "id-ID,en;q=0.5",
        "Referer": "https://www.blackbox.ai/",
        "Content-Type": "application/json",
        "Origin": "https://www.blackbox.ai",
        "Alt-Used": "www.blackbox.ai"
    }

    const data = {
        messages: [{
            role: "user",
            content
        }],
        id: "chat-free",
        previewToken: null,
        userId: "",
        codeModelMode: true,
        agentMode: {},
        trendingAgentMode: {},
        isMicMode: false,
        userSystemPrompt: "You are Dark Box, a useful AI Model for millions of developers using Blackbox Code Chat that will answer coding questions and help them when writing code.",
        maxTokens: 1024,
        webSearchMode: false,
        promptUrls: "",
        isChromeExt: false,
        githubToken: null
    }

    try {
        const blackboxResponse = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        })

        const blackboxData = await blackboxResponse.text()
        return blackboxData
    } catch (error) {
        console.error("Error fetching data:", error)
        return null
    }
}