'use strict';

const { watch } = require('fs')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const controller = require('./controller')
const templating = require('./templating')
const WebSocket = require('ws');
const Cookies = require('cookies');
const { Buffer } = require('buffer');

const WebSocketServer = WebSocket.Server
const app = new Koa()

const isProduction = process.env.NODE_ENV === 'production'

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    let start = new Date().getTime()
    await next()
    let execTime = new Date().getTime() - start
    ctx.response.set('X-response-Time', `${execTime}ms`)
})

app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '')
    await next()
})

if (!isProduction) {
    let staticFiles = require('./static-files')
    app.use(staticFiles('/static/', __dirname + '/static'))
}

app.use(bodyParser())


app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}))

app.use(controller())

let server = app.listen(3000)
console.log('app started at prot 3000...')

let wss = new WebSocketServer({
    server: server
})

wss.on('connection', ws => {
    let user = parseUser(ws.upgradeReq)
    if (!user) {
        ws.close(4001, 'Invalid user')
    }
    ws.user = user
    ws.wss = wss
    ws.on('message', message => {
        console.log(message)
        if (message && message.trim()) {
            let msg = createMessage('chat', user, message.trim())
            wss.broadcast(msg)
        }
    })
})

wss.broadcast = function (data) {
    wss.clients.forEach(client => client.send(data))
}


function parseUser(obj) {
    if (!obj) {
        return
    }
    console.log('try parse: ' + obj)
    let s = ''
    if (typeof obj === 'string') {
        s = obj
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null)
        s = cookies.get('name')
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString())
            console.log(`User: ${user.name}, ID: ${user.id}`)
            return user
        } catch (error) {
            console.error(error)
        }
    }
}


let messageIndex = 0
function createMessage(type, user, data) {
    messageIndex++
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    })
}

