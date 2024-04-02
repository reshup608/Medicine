var mysql=require("mysql")

var pool=mysql.createConnection({
    host:'bfuqmeao0rqmrq1ynjja-mysql.services.clever-cloud.com',
    port:3306,
    user:'uin8jw3yzbk8kek7',
    password:'TWUq16l3l5GOoXxalzPz',
    database:'bfuqmeao0rqmrq1ynjja',
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
