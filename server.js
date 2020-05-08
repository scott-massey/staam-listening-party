const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'layout'
}));

app.get('/', (req, res) => {
  res.render('index')
});
app.get('/index', (req, res) => {
  res.render('index')
});
app.get('/admin', (req, res) => {
  res.render('admin')
});
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(express.static('assets'));

//Find port and listen on that port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

console.log('Server running');

io.sockets.on('connection', (socket) => {
  socket.on("change_video_admin", (embed) => {
    socket.broadcast.emit("change_video", embed);
  });
});
