'use strict';

const
    path = require('path'),
    mime = require('mime'),
    fs = require('mz/fs')

// url: 类似'/static/'
// dir: 类似 __dirname + '/static'
function staticFiles (url, dir) {
    return async (ctx, next) => {
        let rPath = ctx.request.path
        if (rPath.startsWith(url)) {
            let fp = path.join(dir, rPath.substring(url.length))
            if (await fs.exists(fp)) {
                ctx.response.type = mime.lookup(rPath)
                ctx.response.body = await fs.readFile(fp)
            } else {
                ctx.response.status = 404
            }
        } else {
            await next()
        }
    }
}


module.exports = staticFiles;