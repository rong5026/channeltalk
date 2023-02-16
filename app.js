const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const { sequelize } = require("./models");

const socket = require('socket.io');
const http = require('http');
const fs = require('fs');

const server = http.createServer(app);
const io = socket(server);


require('dotenv').config();  //.env 파일에서 환경변수 가져오기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: '*',
  credentials: 'true'

}));

// db연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connected Success");
  })
  .catch((err) => {
    console.error(err);
  });

// 라우터
app.use("/users", require("./routes/users")); // 유저
app.use("/images", require("./routes/images")); // 이미지

app.use(express.static('public'))
app.use('/css', express.static('./public/css'))
app.use('/javascript', express.static('./public/javascript'))

// test chat

app.get('/chat', function(request, response) {
  fs.readFile('./public/html/index.html', function(err, data) {
    if(err) {
      response.send('에러')
    } else {
      response.writeHead(200, {'Content-Type':'text/html'})
      response.write(data)
      response.end()
    }
  })
})

io.on('connection', (socket) => {

  // 유저 접속
  socket.on('newUser', (name) => {
    console.log(name + ' 님이 접속하였습니다.');

    socket.name = name;

    io.socket.emit('update', {
      type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'
    });
  })
  
  // 접속한 메세지 받기
  socket.on('message', (data) => {
    /* 받은 데이터에 누가 보냈는지 이름을 추가 */
    data.name = socket.name
    console.log(data)
    /* 보낸 사람을 제외한 나머지 유저에게 메세지 전송 */
    socket.broadcast.emit('update', data)
  })
  
  // 접속 종료
  socket.on('disconnect', () => {
    console.log(socket.name + '님이 나가셨습니다.')
    /* 나가는 사람을 제외한 나머지 유저에게 메세지 전송 */
    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'})
  })

  socket.on('send', function(data) {
    console.log('전달된 메시지:', data.msg)
  })
 
  socket.on('disconnect', function() {
    console.log('접속 종료')
  })

})


// test front
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "test.html"));
});

app.listen(3000, () => {
  console.log("Express App on port 3000!");
});