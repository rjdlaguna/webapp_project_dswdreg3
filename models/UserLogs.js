const moment = require('moment-timezone')
// let datePhil = moment.utc(Date.now()).tz('Asia/Manila')
let currentDate = moment.tz(new Date().toString('yyyy-mm-ddTHH:mm:ss'), 'Asia/Manila');

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
        type: Date,
        default: currentDate
    },
},{
    collection: 'userlogs'
})

module.exports = Logs = mongoose.model('logs', UserLogsSchema)