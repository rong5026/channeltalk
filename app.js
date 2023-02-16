const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const { sequelize } = require("./models");

require('dotenv').config();  //.env 파일에서 환경변수 가져오기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/users", require("./routes/users")); // 유저
app.use("/images",require("./routes/images")); // 이미지

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "test.html"));
});

app.listen(3000, () => {
  console.log("Express App on port 3000!");
});