const mongoose = require("mongoose")
const Schema = mongoose.Schema
const CenterProfileSchema = new Schema({
    center_name: {
        type: String
    },
    center_desc: {
        type: String
    },
    center_head_firstname: {
        type: String
    },
    center_head_middleinitial: {
        type: String
    },
    center_head_lastname: {
        type: String
    },
    center_indivtype: {
        type: String
    },
    center_gender: {
        type: String
    },
    center_location: {
        type: String
    },
    center_yearfounded: {
        type: Number
    },
    center_email: {
        type: String
    },
    center_telno: {
        type: Number
    },
    center_mobileno: {
        type: Number
    },
    center_long: {
        type: Number
    },
    center_lat: {
        type: Number
    },
    center_picture: {
        data: Buffer,
        contentType: String
    },
    image_path: {
        type: String
    },
    image_name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    collections: 'centers_profile'
})

module.exports = CentersProfile = mongoose.model('centersinfo', CenterProfileSchema)