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
        type: Number
    },
    birthdate: {
        type: Date
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
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