const Koa = require('koa')
const fs = require('fs')
const { resolve } = require('path')
const { rejects } = require('assert')
const app = new Koa()

// function viewRender(page) {
//     return new Promise((resolve, reject) => {
//         let viewUrl = `./view/${page}`
//         fs.readFile(viewUrl, 'binary', (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })
// }

function parsePostData (ctx) {
    return new Promise((resolve, reject) => {
        let postData = ""
        ctx.req.addListenter('data', (data) => {
            postData += data
        })
        ctx.req.addListenter('end', () => {
            let parseData = 
        })
    })
}

// log
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const cost = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${cost}ms`)
})



app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')