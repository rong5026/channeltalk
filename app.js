const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html", "test.html"));
  });

app.listen(3000, () => {
    console.log("Express App on port 3000!");
});