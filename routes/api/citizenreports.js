const express = require("express")
const citizenreports = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const CitizenReport = require("../../models/CitizensReport")
citizenreports.use(cors())

process.env.SECRET_KEY = 'secret'
citizenreports.post("/reportincident", (req, res) => {
    const today = new Date()
    const CtzenRepData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        individual_type: req.body.individual_type,
        gender: req.body.gender,
        location: [
            {
            blk_st_brgy: req.body.blk_st_brgy,
            city_town: req.body.city_town,
            province: req.body.province
            }
        ],
        description: req.body.description,
        reported: today
    }
    CitizenReport.create(CtzenRepData)
            .then(ctzen => {
                res.json({ status: 'Incident Successfully Reported...' })
            })
            .catch(err => {
                res.send('error: ' + err)
            })
})

module.exports = citizenreports