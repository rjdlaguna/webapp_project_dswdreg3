const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CenterIncidentReports = new Schema({
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
    },
    status:{
        type: String
    },
    user_id: {
        type: String
    },
    center_userid: {
        type: String
    },
    report_id:{
        type: String
    },
    report_image1: {
        data: Buffer,
        contentType: String,
        image_path: String,
        image_name: String 
    },
    report_image2: {
        data2: Buffer,
        contentType2: String,
        image_path2: String,
        image_name2: String 
    },
    last_update:{
        type: Date,
        default: Date.now
    }
},{
    collection: 'center_incidentreports'
})

module.exports = CenterIncidentReport = mongoose.model('centerincidentreports', CenterIncidentReports)