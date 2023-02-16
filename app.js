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
app.use(express.static('./public/css'))
app.use(express.static('./public/js'))

// test chat

app.get('/', function (request, response) {
  fs.readFile('./public/index.html', function (err, data) {
    if (err) {
      response.send('에러')
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' })
        .write(data)
        .end();
    }
  })
})

io.sockets.on('connection', (socket) => {

  console.log(socket.id);
  console.log(socket);
  // 새로 입장
  socket.on('newUserConnect', (name) => {

    socket.name = name;

    io.sockets.emit('updateMessage', {
      name: 'SERVER',
      message: name + '님이 접속했습니다'
    });
  });

  // 퇴장
  socket.on('disconnect', () => {

    socket.broadcast.emit('updateMessage', {
      name: 'SERVER',
      message: socket.name + "님이 퇴장했습니다."
    });
  });

  //메세지 전송
  socket.on('sendMessage', function (data) {
    data.name = socket.name;
    io.sockets.emit('updateMessage', data);
  });

})


// test front
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "test.html"));
// });

server.listen(8080, () => {
  console.log("소켓서버 실행 중..");
})

// app.listen(3000, () => {
//   console.log("Express App on port 3000!");
// });