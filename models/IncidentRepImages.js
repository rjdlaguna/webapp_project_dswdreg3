const mongoose = require("mongoose")
const Schema = mongoose.Schema

const IncidentRepImgSchema = new Schema({
    report_id: {
        type: String,
        required: true
    },
    incident_rep_img1: {
        data: Buffer,
        contentType: String
    },
    incident_rep_img1_path: {
        type: String
    },
    incident_rep_img1_name: {
        type: String
    },
    incident_rep_img2: {
        data: Buffer,
        contentType: String
    },
    incident_rep_img2_path: {
        type: String
    },
    incident_rep_img2_name: {
        type: String
    }
},{
    collection: 'incidentreport_images'
})

module.exports = IncidentReportImages = mongoose.model('IncidentReportPictures', IncidentRepImgSchema)