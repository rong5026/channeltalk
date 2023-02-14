const express = require('express');
const router = express.Router();
const models = require("../models");

// 유저 전체 조회
router.get('/', (req, res, next) => {
    models.User.findAll()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      })
  });



module.exports = router;
