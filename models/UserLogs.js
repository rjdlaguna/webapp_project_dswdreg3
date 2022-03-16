//const moment = require('moment-timezone')
//let currentDate = moment.utc(Date.now()).tz('Asia/Manila')
//let currentDate = moment(new Date(), 'YYYY/MM/DD').tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss z');
//let currentDate = moment.tz(new Date(), 'YYYY/MM/DD', 'Asia/Manila').format('YYYY-MM-DD HH:mm:ss z');
//let currentDate = moment.tz(new Date(), "America/New_York");
//let currentDate = moment.tz(new Date(), "America/New_York");
//let philDate = currentDate.clone().tz("Asia/Manila").format()
//console.log(new Date(philDate))
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserLogsSchema = new Schema({
    user_id: {
        type: String
    },
    user_activity: {
        type: String
    },
    timestamp: {
        type: String
    },
},{
    collection: 'userlogs'
})

module.exports = Logs = mongoose.model('logs', UserLogsSchema)