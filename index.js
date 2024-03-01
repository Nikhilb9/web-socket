const { createServer } = require("http")
const staticHandler = require("serve-handler")
const ws = require("ws")

const server = createServer((req, res) => {   // (1)
    return staticHandler(req, res, { public: 'public' })
});

const wss = new ws.WebSocketServer({ server }) // (2)
let map = new Map()
wss.on('connection', (client, req) => {
    client.id = req.headers['sec-websocket-key']
    if (!map.has(client.id)) map.set(client.id, true)
    console.log(map)
    client.on('message', (msg, isBinary) => {    // (3)
        wss.clients.forEach(function each(c) {
            let message = JSON.parse(msg.toString())
            if (message.receiverId && message.receiverId === c.id) {
                c.send(message.message, { binary: isBinary });
            } else if (!message.receiverId) c.send(message.message, { binary: isBinary })
            return
        });
    })

    client.on("close", data => {
        map.delete(client.id)
        console.log("Connection Close")
    })
    client.on("error", data => {
        console.log("Error", data)
    })
    client.on("open", data => {
        console.log("Connection Open")
    })
})


server.listen(process.argv[2] || 8080, () => {
    console.log(`server listening...`);
})
