const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CitizenReportSchema = new Schema({
    first_name: {
        type: String
    },
    middle_initial: {
        type: String
    },
    last_name: {
        type: String
    },
    individual_type: {
        type: String
    },
    gender: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    reported_on: {
        type: Date,
        default: Date.now
    },
    center_name: {
        type: String
    },
    center_id: {
        type: String
    },
    user_id: {
        type: String
    },
    distance: {
        type: Number
    },
    reported_by: {
        type: String
    },
},{
    collection: 'citizen_reports'
})

module.exports = CitizenReport = mongoose.model('citizenreports', CitizenReportSchema)