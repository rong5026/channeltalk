const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("hackathondb", "", "", {
      host: "rds.amazonaws.com",
      port: "3306",
      dialect: "mysql",
      directory :".././models"
      //noAlias: true // as 별칭 미설정 여부
   }
);
auto.run((err)=>{
   if(err) throw err;
})
