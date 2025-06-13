import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const hostname = process.env.HOSTNAME || 'localhost'
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port, '0.0.0.0', () => {
    console.log(
      `> Server listening at http://${hostname}:${port} as ${dev ? 'development' : process.env.NODE_ENV}`
    )
  })
})
