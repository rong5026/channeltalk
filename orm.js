const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("hackathondb", "root", "00000000", {
      host: "hackathonserver.cynr3skzai4u.ap-northeast-2.rds.amazonaws.com",
      port: "3306",
      dialect: "mysql",
      directory :"./models"
      //noAlias: true // as 별칭 미설정 여부
   }
);
auto.run((err)=>{
   if(err) throw err;
})