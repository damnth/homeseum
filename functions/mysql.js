let mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asp,
    multipleStatements: true
})

class MySql {
    Query = (sql) => {
        return new Promise(function (resolve, reject) {
            connection.query(sql, function (e, r, f) {
                if (e) {
                    console.log([]);
                    resolve(false);
                }
                else {
                    resolve(r);
                }
            });
        });
    }
}

export default MySql