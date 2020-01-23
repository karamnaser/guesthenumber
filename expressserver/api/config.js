const MySql = require('mysql');

let connectore = MySql.createConnection({
    host: "localhost",
    user: "root",
    password: "RootPasword",
    database: "guesnumber"
})

module.exports = connectore;