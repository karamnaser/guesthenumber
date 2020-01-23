const connectore = require('../config');

const sendData = (data) => {
    return new Promise((resolve) => {
        connectore.query("INSERT INTO games(userid,min_number,max_number,choosin_number) VALUES (?,?,?,?)", [data.userid, data.minnumber, data.maxnumber, data.choosennumber], (err, result) => {
            resolve(result)
        })
    })
}

const getgamenumbers = (gameid) => {
    return new Promise((resolve) => {
        connectore.query("SELECT * FROM games g left join guessednumber gn on g.id=gn.gameid where gameid=?", [gameid], (err, result) => {
            resolve(result)
        })
    })
}

const sendgamenumbers = (data) => {
    return new Promise((resolve) => {
        connectore.query("INSERT INTO guessednumber(gameid,_number) VALUES (?,?)", [data.gameid, data.number], (err, result) => {
            resolve(result)
        })
    })
}
module.exports = { sendData, getgamenumbers, sendgamenumbers };