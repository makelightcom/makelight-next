const express = require('express')
const next = require('next')
const compression = require('compression')
const routes = require('./routes')
const { parse } = require('url')
const { join } = require('path')
const expressModifyResponse = require('express-modify-response')
const Entities = require('html-entities').AllHtmlEntities
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const routeHandler = routes.getRequestHandler(app)
const Prismic = require('prismic-javascript')
const RedisCachedPrismicApi = require('./RedisCachedPrismicApi')
const interceptor = require('express-interceptor')
const Raven = require('raven')
const fs = require('fs')
let stylesheet

fs.readFile('./static/css/bundle.css', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  stylesheet = data
  console.log('Got stylesheet')
})

Raven.config('https://HIDDEN@sentry.io/1211915').install()

const entities = new Entities()
let redisSettings
if (process.env.NODE_ENV == 'production') {
  redisSettings = {
    host: 'HIDDEN', 
    port: 6379, 
    options: {
      password: 'HIDDEN'
    },
    debug: true,
    max: 5000
  }
} else {
  redisSettings = {
    host: 'localhost',
    port: 6379,
    options: {
    },
    debug: true,
    max: 5
  }
}

const prismicApiEndpoint = 'https://makelight.prismic.io/api/v2'

let cachedApi = new RedisCachedPrismicApi(prismicApiEndpoint, redisSettings)

let redisCache = require('express-redis-cache')({
  client: cachedApi.redisPubClient,
  prefix: `route-${process.env.DEPLOYMENT_ID}`,
  expire: {
    200: 60,
    403: 5,
    500: 5,
    xxx: 1
  }
})

const metaContentFixer = interceptor(function (req, res) {
  return {
    isInterceptable: function (rq, rs) {
      return /text\/html/.test(res.get('Content-Type'))
    },
    intercept: function (body, send) {
      send(body.toString().replace(/content="([^"]+)"/g, function (match, content) {
        return `content="${entities.decode(content)}"`
      }))
    }
  }
})

const stylesheetInjector = interceptor(function (req, res) {
  return {
    isInterceptable: function (rq, rs) {
      return /text\/html/.test(res.get('Content-Type'))
    },
    intercept: function (body, send) {
      send(body.toString().replace('<server-side-stylesheet></server-side-stylesheet>', function (match, content) {
        return `<style>${stylesheet}</style>`
      }))
    }
  }
})

app.prepare()
  .then(() => {
    const server = express()

    server.use(Raven.requestHandler())

    if (process.env.NODE_ENV === 'production') {
      server.use(compression())
      server.use(redisCache.route())
    }

    server.use(metaContentFixer)
    server.use(stylesheetInjector)

    // server.use(routeHandler)

    server.use((req, res, next) => {
      const api = cachedApi.api
      req.prismic = { api }
      req.cache = cachedApi.redisCache.lru
      next()
    })

    server.use(express.json())

    server.post('/prismic', (req, res) => {
      cachedApi.refresh()
      cachedApi = new RedisCachedPrismicApi(prismicApiEndpoint, redisSettings)
      res.end('Cheers Prismic!')
    })

    server.get('/service-worker.js', (req, res) => {
      const filePath = join(__dirname, '.next', 'service-worker.js')
      res.setHeader('Cache-Control', 'no-cache')
      result = app.serveStatic(req, res, filePath)
    })

    server.get('/courses/:uid', (req, res) => {
      const actualPage = '/courses/show'
      const queryParams = { uid: req.params.uid }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/courses/:uid/dashboard', (req, res) => {
      console.log('Dashboard page')
      const actualPage = '/courses/dashboard'
      const queryParams = { uid: req.params.uid }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/online-courses/:uid', (req, res) => {
      const actualPage = '/courses/show'
      console.log('Online course page')
      app.render(req, res, actualPage, { uid: req.params.uid })
    })

    server.get('/online-courses/', (req, res) => {
      const actualPage = '/courses/index'
      console.log('Courses page')
      app.render(req, res, actualPage, { })
    })

    server.get('/courses/', (req, res) => {
      const actualPage = '/courses/index'
      console.log('Courses page')
      app.render(req, res, actualPage, { })
    })

    server.get('/articles/categories', (req, res) => {
      const actualPage = '/categories'
      app.render(req, res, actualPage, {})
    })

    server.get('/articles/:uid', (req, res) => {
      const actualPage = '/articles'
      const queryParams = { uid: req.params.uid }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/pages/:uid', (req, res) => {
      const actualPage = '/pages'
      const queryParams = { uid: req.params.uid, layout: req.query.layout }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/lessons/:uid', (req, res) => {
      const actualPage = '/lessons/show'
      const queryParams = { uid: req.params.uid }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/podcasts/:uid', (req, res) => {
      const actualPage = '/podcasts/show'
      const queryParams = { uid: req.params.uid }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/articles/categories/:uid', (req, res) => {
      const actualPage = '/articles/categories'
      const queryParams = { uid: req.params.uid }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/posts/:id', (req, res) => {
      return app.render(req, res, '/posts', { id: req.params.id })
    })

    server.get('/_next/*', (req, res) => {
      return routeHandler(req, res)
    })

    server.get('/static*', (req, res) => {
      return routeHandler(req, res)
    })

    server.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'public, max-age=300')
      return routeHandler(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })

    // The error handler must be before any other error middleware
    server.use(Raven.errorHandler())

    // Optional fallthrough error handler
    server.use(function onError (err, req, res, next) {
      // The error id is attached to `res.sentry` to be returned
      // and optionally displayed to the user for support.
      res.statusCode = 500
      res.end(res.sentry + '\n')
    })
  })
