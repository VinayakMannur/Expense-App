const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'expense-app',
    password: 'Vinz@#$200120'
})

module.exports = pool.promise();