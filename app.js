const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const { sequelize } = require("./models");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  credentials: 'true'

}));

require('dotenv').config();  //.env 파일에서 환경변수 가져오기

// db연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connected Success");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html", "test.html"));
});

app.listen(3000, () => {
  console.log("Express App on port 3000!");
});