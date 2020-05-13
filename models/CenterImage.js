const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CenterImageSchema = new Schema({
    center_picture: {
        data: Buffer,
        contentType: String
    },
    center_id: {
        type: String,
        required: true
    },
    image_path: {
        type: String
    },
    image_name: {
        type: String
    }
},{
    collection: 'center_image'
})

module.exports = CenterPicture = mongoose.model('centerpicture', CenterImageSchema)