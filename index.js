const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const apiRoute = require('./apiRoute')

app.use(bodyParser());

// logger

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})
app.use(apiRoute.routes())
app.use(apiRoute.allowedMethods())


app.listen(3000, () => {
  console.log('We are now live on port 3000!')
})