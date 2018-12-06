import routes from './routes'
import express from 'express'
import path from 'path'
import pug from 'pug'
import compression from 'compression'
const app = express()

app.engine('pug', pug.__express)
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'pug')
app.use(compression())
app.use(express.static('./public'))
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next()
})
app.use('/', routes)


const PORT = process.env.PORT || 5000;
app.listen(PORT)
