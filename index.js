const app = require('express')()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

io.on('connection', socket => {
  console.log('a user connected!')
  socket.on('likes:updated', () => {
    socket.broadcast.emit('likes:update', likes)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected!')
  })
})

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/styles/style.css'))
})

let likes = 0

app.get('/', (req, res) => {
  res.render(path.join(__dirname + '/views/index.ejs'), { likes }, (err, html) => {
    res.send(html)
  })
})

app.post('/like', (req, res) => {
  likes++
  res.json({ likes })
})

http.listen(3000, () => console.log('the app is running on http://localhost:3000'))
