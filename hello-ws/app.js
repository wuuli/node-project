const WebSocket = require('ws')

const WebSocketServer = WebSocket.Server

const wss = new WebSocketServer({
    port: 3000
})
console.log('start')
wss.on('connection', ws => {
    console.log(`[SERVER] connection()`)
    ws.on('message', message => {
        console.log(`[SERVER] Received: ${message}`)
        ws.send(`ECHO: ${message}`, err => {
            if (err) {
                console.log(`[SERVER] error: ${err}`)
            }
        })
        
    })
    
})


let ws = new WebSocket('ws://localhost:3000/test')

ws.on('open', () => {
    console.log('[CLIENT] open()')
    ws.send('Hello!')
})

ws.on('message', message => {
    console.log(`[CLIENT] Received: ${message}`)
})