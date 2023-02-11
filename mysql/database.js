const mysql = require('mysql');


const connection = mysql.createConnection({
    host:'entz.mysql.database.azure.com',
    user:'rong5026',
    password:'@ghddudghks1029',
    port:'3306',
    database:'hackathon'
});

connection.connect();

console.log("db연결 성공 성공");

module.exports = connection;
