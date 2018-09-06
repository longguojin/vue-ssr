const fs = require('fs')
const path = require('path')
const express = require('express')
const server = express()

//the following for server cache
const LRU = require('lru-cache')
const favicon = require('serve-favicon')
const compression = require('compression')
const microcache = require('route-cache')
const isProd = process.env.NODE_ENV === 'production'

//resolve path
const resolve = p => {
  return path.resolve(__dirname, p)
}

function createRenderer() {
  //init readerer
  const {
    createBundleRenderer
  } = require('vue-server-renderer')
  const template = fs.readFileSync(resolve('./index.tpl.html'), 'utf-8')
  const serverBundle = require('../dist/vue-ssr-server-bundle.json')
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')

  //create renderer
  const renderer = createBundleRenderer(serverBundle, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    inject: false, //disable auto inject
    runInNewContext: false, // recommended
    template, // (optional) page template
    clientManifest,  // (optional) page template
  })

  return renderer;
}


const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

//middlewares
server.use(compression({
  threshold: 0
}))
server.use(favicon(resolve('../dist/favicon.ico')))
server.use('/', serve('../dist', true))
server.use('/', serve('../public', true))

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const useMicroCache = process.env.MICRO_CACHE !== 'false'
server.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))



// inside a server handler...
server.get('*', function (req, res) {
  let context = {
    url: req.url
  }

  let renderer = createRenderer();

  // No need to pass an app here because it is auto-created by
  // executing the bundle. Now our server is decoupled from our Vue app!
  renderer.renderToString(context).then(html => {
    res.send(html)
  }).catch(err => {
    if (err.code === 404) {
      res.status(404).end('Page not found')
    } else {
      res.status(500).end('Internal Server Error')
    }

    console.error(err)
  })

})

server.listen(3000);
