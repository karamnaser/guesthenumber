const connectore = require('../config');

function getUsers(userid) {
    return new Promise((resolve) => {
        connectore.query("SELECT *,u.id as userid,g.id as gameid  FROM users u left join games g on u.id=g.userid where userid=? ", [userid], (err, result) => {
            resolve(result)
        })
    })
}

function sendUserData(username) {
    return new Promise((resolve) => {
        connectore.query("INSERT INTO users(name) VALUES (?)", [username], (err, result) => {
            resolve(result)
        })
    })
}
module.exports = { getUsers, sendUserData };