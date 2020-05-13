const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfileImageSchema = new Schema({
    profile_pic: {
        data: Buffer,
        contentType: String
    },
    user_id: {
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
    collection: 'profile_image'
})

module.exports = ProfilePicture = mongoose.model('profilepic', ProfileImageSchema)