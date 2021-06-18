const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserSchema = new Schema({
    first_name: {
        type: String
    },
    middle_initial: {
        type: String
    },
    last_name: {
        type: String
    },
    mobile_no: {
        type: String
    },
    birthdate: {
        type: Date
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    password: {
        type: String
    },
    confirm_password: {
        type: String
    },
    user_type: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    image: {
        data: Buffer, contentType: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    position: {
        type: String
    },
    center_id: {
        type: String
    },
    active:{
        type: Boolean,
        default: true
    }
},{
    collection: 'useraccounts'
})

module.exports = User = mongoose.model('users', UserSchema)