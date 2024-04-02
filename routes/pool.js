var mysql=require("mysql")

var pool=mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'root123',
    database:'pharmacy',
    connectionLimit:100,
    multipleStatements:true});

    pool.connect(function (err) {
        if (err) {
            console.log('Error connecting to Database',err);
            return;
        }
        console.log('Connection established');
    });

module.exports = pool;