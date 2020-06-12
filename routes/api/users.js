const express = require("express")
const fs = require("fs")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const multer = require("multer")
const path = require('path')

var passport = require('passport');
const key = require('../../config/keys').secret;
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, '../webapp_project/client/src/assets/images/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const User = require("../../models/User")
const CitizenReport = require("../../models/CitizensReport")
const ProfilePicture = require("../../models/ProfileImage")
const CentersProfile = require("../../models/CentersProfile")
const CenterImage = require("../../models/CenterImage")
const IncidentReportImages = require("../../models/IncidentRepImages")
users.use(cors())

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
  }

process.env.SECRET_KEY = 'secret'
let u_id = 0, cen_id = 0;
let rep_id;

//Get API Key
users.get('/getapikey', (req, res) => {
    console.log('getting the api key')
    var myAPIKey = 'AIzaSyD0av1I6ws3pKn06FOdeRfBt0HRqxBhBao'
    res.json(myAPIKey)
})

//User Registration (Working)
users.post('/registeruser', (req, res) => {
    var user_type = 'citizen'
    const created = new Date()
    let {
        first_name,
        middle_initial,
        last_name,
        mobile_no,
        birthdate,
        address,
        email,
        username,
        password,
        confirm_password
    } = req.body

    //Check for the unique username
    User.findOne({
        username: username
    }).then(user => {
        if(user) {
            console.log('Username is already taken...')
            return res.status(500).json({
                error: "true",
                msg: "Username is already taken."
            })
        } else {
                //Check for the unique email
                User.findOne({
                    email: email
                }).then(user => {
                    if(user) {
                        console.log('Email is already registered...')
                        return res.status(500).json({
                            failed: 'true',
                            msg: "Email is already registered."
                        })
                    } else {
                            //The data is valid and user can be registered       
                            let newUser = new User({
                                first_name,
                                middle_initial,
                                last_name,
                                mobile_no,
                                birthdate,
                                address,
                                email,
                                username,
                                password,
                                confirm_password,
                                user_type,
                                created,
                            });
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if(err) throw err;
                                    newUser.password = hash;
                                    newUser.save().then(user => {
                                        // console.log('Saving picture')
                                        //Save Temporary Profile Picture
                                        User.findOne().sort({created: -1}).exec(function(err, info) {
                                            if (err) {return err}
                                            u_id = info.id
                                            console.log(info.id)
                                        var img = fs.readFileSync('../webapp_project/client/src/assets/images/temp_pic.jpg')
                                        var encode_image = img.toString('base64')

                                        /*let imgtype = '"image/*"'
                                        let imgdata = Buffer.from(encode_image).toString('base64')
                                        let imgpath = '@/assets/images/temp_pic.jpg'
                                        let imgname = 'temp_pic.jpg'*/
                                        
                                        const TempPicData = {
                                            profile_pic: {
                                                contentType: '"image/jpg"',
                                                data: Buffer.from(encode_image).toString('base64')
                                            },
                                            user_id: u_id,
                                            image_path: '@/assets/images/temp_pic.jpg',
                                            image_name: 'temp_pic.jpg'
                                        }
                                        
                                        /* let profimage = new ProfilePicture({
                                            profile_pic:{
                                                imgtype,
                                                imgdata
                                            },
                                            u_id,
                                            imgpath,
                                            imgname
                                        })
                                        profimage.save()
                                        .then(temppic=> {
                                            console.log('Temporary Profile Picture Saved.')
                                        }) */

                                        ProfilePicture.create(TempPicData)
                                        .then(temppic=> {
                                            // res.json({ status: user.email + ' registered' })
                                            console.log('Temporary Profile Picture Saved.')
                                        })

                                        //Create the verification token for the user
                                        /*var token = new Token({ 
                                            _userId: user._id, 
                                            token: crypto.randomBytes(16).toString('hex') 
                                        })
                                        //Save the token
                                        token.save(function(err) {
                                            if (err) {
                                                return res.status(500).send({msg: err.message})
                                            }
                                            var transporter = nodemailer.createTransport({
                                                service: 'Sendgrid', 
                                                auth: {user: process.env.SENDGRID_USERNAME,
                                                pass: process.env.SENDGRID_PASSWORD
                                            }
                                            })
                                            var mailOptions = {
                                                from: 'rondelacruz2020@gmail.com',
                                                to: user.email, 
                                                Subject: 'Account Verification Token',
                                                text: 'Hello, ' + user.first_name + ' ' + user.last_name + '. Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' 
                                            }
                                            transporter.sendMail(mailOptions, function(err) {
                                                if (err) {
                                                    return res.status(500).send({msg: err.message})
                                                }
                                                res.status(200).send('A verification email has been sent to '+ user.email + '.')
                                            })
                                        }) */
                                    })
                                        
                                        return res.status(201).json({
                                            success: 'true',
                                            msg: "User is successfully registered."
                                        })
                                    })
                                })
                            })
                    }
                })
        }
    })

})

users.get('/edituserdata/:id', (req, res) => {
    let id = req.params.id
    User.findById(id, function(err, user_info){
        if(err) {
            res.json(err)
        }
        res.json(user_info)
    })
})
//User Login (Working)
users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.loginemail
    }).then(user => {
        if (!user) {
            res.json({ error: 'User does not exist' })
            /*return res.status(404).json({
                msg: 'Email not existing.',
                success: false
            });*/
        }
        /*
        if(!user.isVerified) {
            return res.status(401).json({
                type: 'not verified',
                msg: 'Your account has not been verified.'
            });
        }*/
        bcrypt.compare(req.body.loginpassword, user.password).then(isMatch=> {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    user_type: user.user_type
                }
                jwt.sign(payload,key, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: `Bearer ${token}`,
                        msg: 'You are now logged in.'
                    })
                    res.json(token)
                    // res.send(token)
                })
            } else {
                res.json({ error: 'User does not exist' })
            } 
        })
    })
})

//Show User Profile (Working)
users.get('/profile', passport.authenticate('jwt', { 
    session: false
}), (req, res) => {
    // console.log(req.user)
    return res.json({
        user: req.user
    })
})

//Uploading Profile Picture (Working)
users.post("/uploadprofilepic/:id", upload.single('image_file'), (req,res) => {
    console.log('uploading picture from ' + req.file.path)
    var img = fs.readFileSync(req.file.path)
    var encode_image = img.toString('base64')
    let id = req.params.id
    var ProfilePicData = {
    profile_pic: {
        contentType: req.file.mimetype,
        data: Buffer.from(encode_image).toString('base64')
    },
    user_id: id,
    image_path: req.file.path,
    image_name: req.file.filename
    }
    ProfilePicture.findOneAndUpdate({user_id:id},ProfilePicData)
    .then(profpic => {
        // res.json({ status: 'Profile Picture Successfully Uploaded...' })
        return res.status(201).json({
            success: 'true',
            msg: "Profile picture successfully uploaded."
        })
    })
    .catch(err => {
        res.send('error: ' + err)
    })   

})

//Displaying Profile Picture (Working)
users.get("/displayprofilepic/:id", (req, res) => {  
    // console.log(req.params.id)
    // console.log('hello')
    var id = req.params.id
    let image_id = 0
    var image_data = null
    var image_content = null
    var uid = req.params.id;
    var ObjectId = require('mongodb').ObjectID;
    var image_format = null
    var decoded_image = null
        ProfilePicture.findOne({user_id: id}, function(err, result){
            if (err) {
                res.json(err)
            }   
            image_id = result.user_id
            image_data = result.profile_pic.data
            image_format = Buffer.from(image_data,'base64')
            res.setHeader('content-type',image_content)
            // decoded_image = fs.writeFileSync(result.image_name,image_format)
            // console.log(result.image_path)
            res.send(result.image_name)
        })
})

//Updating User Information
users.post('/updateaccountinfo/:id', (req, res) => {
    //console.log('hello '  + req.params.id)
    let id = req.params.id
    let {
        first_name,
        middle_initial,
        last_name,
        mobile_no,
        birthdate,
        address
    } = req.body

    User.findById(id, function (err, info){
        if(!info){
            // res.status(404).send('Incident report information cannot be found.')
            res.status({ error: err })
        }
        else{
            info.first_name = first_name,
            info.middle_initial = middle_initial,
            info.last_name = last_name,
            info.mobile_no = mobile_no,
            // info.birthdate = birthdate,
            info.address = address
            info.save().then(()=>{
                return res.status(201).json({
                    success: 'true',
                    msg: "User information successfully updated."
                })
            })
        }
    })
    .catch(() => {
        res.status(400).send('Unable to update record in the database.')
    })
})

//Change User Password
users.post('/changepassword/:id', (req, res) => {
    let id = req.params.id
    let {
        curr_password,
        new_password,
        retyped_new_password
    } = req.body

    User.findById(id, function (err, user){
        if(!user){
            // res.status(404).send('Incident report information cannot be found.')
            res.status({ error: err })
        }
        else{
            bcrypt.compare(curr_password, user.password).then(isMatch=> {
                if (isMatch) {
                    if(curr_password === new_password){
                        // res.json({error: 'New password cannot be the same wih your current password.'})
                        return res.json({
                            failed: 'true',
                            msg: "New password cannot be the same wih your current password."
                        })
                    } else {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(new_password, salt, (err, hash) => {
                                if(err) throw err;
                                user.password = hash;
                                user.confirm_password = retyped_new_password
                                user.save().then(user => {
                                })
                            })
                        })
                        return res.status(201).json({
                            success: 'true',
                            msg: "Password was successfully changed."
                        })
                    }
                } else {
                    res.json({ error: 'Password does not match to your account' })
                } 
            })
        }
    })
    .catch(() => {
        res.status(400).send('Unable to update record in the database.')
    })
})

//Register New Center or Institution (Working)
users.post('/registercenter', (req, res) => {
    const createdAt = new Date()
    let centerID = 0
    //console.log(req.body.center_long)
    //console.log(req.body.center_lat)
    let img = fs.readFileSync('../webapp_project/client/src/assets/images/sample_center.png')
    let encode_image = img.toString('base64')
    let imgtype ='"image/png"'
    let imgdata = Buffer.from(encode_image).toString('base64')
    let image_path = '../webapp_project/client/src/assets/images/sample_center.png'
    let image_name = 'sample_center.png'
    let {
        center_name,
        center_desc,
        center_head_firstname,
        center_head_middleinitial,
        center_head_lastname,
        center_indivtype,
        center_gender,
        center_location,
        center_yearfounded,
        center_email,
        center_telno,
        center_mobileno,
        center_lat,
        center_long,
    } = req.body

    CentersProfile.findOne({
        email: center_email
    }).then(user => {
        if(user) {
            console.log('Email is already registered...')
            return res.status(500).json({
                failed: 'true',
                msg: "Email is already registered."
            })
        } else {
            let newCenter = new CentersProfile({
                center_name,
                center_desc,
                center_head_firstname,
                center_head_middleinitial,
                center_head_lastname,
                center_indivtype,
                center_gender,
                center_location,
                center_yearfounded,
                center_email,
                center_telno,
                center_mobileno,
                center_long,
                center_lat,
                center_picture: {
                    contentType:imgtype,
                    data: imgdata
                },
                image_path,
                image_name,
                createdAt,
            })

            newCenter.save().then(center => {
                /*CentersProfile.findOne().sort({createdAt: -1}).exec(function(err, info) {
                    if (err) {return err}
                    centerID = info._id
                    console.log(info._id)
                    var img = fs.readFileSync('../webapp_project/client/src/assets/images/sample_center.png')
                    var encode_image = img.toString('base64')

                    const TempCenterPic = {
                        center_picture: {
                            contentType: '"image/png"',
                            data: Buffer.from(encode_image).toString('base64')
                        },
                        center_id: centerID,
                        image_path: '../webapp_project/client/src/assets/images/sample_center.png',
                        image_name: 'sample_center.png'
                    }
                    CenterImage.create(TempCenterPic)
                    .then(temppic=> {
                        console.log('Temporary Center Picture Saved.')
                    }) 
                })*/
                return res.status(201).json({
                    success: 'true',
                    msg: "Center was successfully registered."
                })
            })

        } 
    })
})
//Show List of Centers (working)
users.get('/displaycenters', (req, res) => {
    // let id = req.params.id
    // console.log('hello')
    CentersProfile.find(function (err, center){
        if(err) {
            res.json(err)
        }
        //console.log(center)
        res.json(center)
        
    })
})
//Show Center Profile (working)
users.get('/getcenterprofile/:id', (req,res) => {
    let id = req.params.id
    CentersProfile.findById(id, function(err, center){
        if(err) {
            res.json(err)
        }
        // console.log(center)
        res.json(center)
        /*return res.status(201).json({
            success: 'true',
            msg: "Center was successfully registered.",
            center
        })*/
    })
})

//Get Center ID By Profile (working)
users.get('/getcenteridbyprofile/:id', (req,res) => {
    let id = req.params.id
    User.findById(id, function(err, user){
        if(err) {
            res.json(err)
        }
        // console.log(center)
        res.json(user)
        /*return res.status(201).json({
            success: 'true',
            msg: "Center was successfully registered.",
            center
        })*/
    })
})

//Display Center Image
users.get("/displaycenterimage/:id", (req, res) => {  
    //console.log(req.params.id)
    //console.log('hello')
    var id = req.params.id
    let image_id = 0
    var image_data = null
    var image_content = null
    var uid = req.params.id;
    var ObjectId = require('mongodb').ObjectID;
    var image_format = null
    var decoded_image = null
        CentersProfile.findOne({_id: id}, function(err, result){
            if (err) {
                res.json(err)
            }   
            image_id = result._id
            image_data = result.center_picture.data
            image_format = Buffer.from(image_data,'base64')
            res.setHeader('content-type',image_content)
            decoded_image = fs.writeFileSync(result.image_name,image_format)
            // console.log(result.image_path)
            res.send(result.image_name)
        })
})

//Uploading Center Image
users.post("/uploadcenterpic/:id", upload.single('image_file'), (req,res) => {
    var img = fs.readFileSync(req.file.path)
    var encode_image = img.toString('base64')
    let id = req.params.id
    let imgcontent = req.file.mimetype
    let imgdata = Buffer.from(encode_image).toString('base64')
    let imgpath = req.file.path
    let imgname = req.file.filename

    CentersProfile.findById(id, function (err, info){
        if(!info){
            // res.status(404).send('Incident report information cannot be found.')
            res.status({ error: err })
        }
        else{
            info.center_picture.contentType = imgcontent,
            info.center_picture.data = imgdata,
            info.image_path = imgpath,
            info.image_name = imgname,
            // info.birthdate = birthdate,
            info.save().then(()=>{
                return res.status(201).json({
                    success: 'true',
                    msg: "Center image successfully uploaded."
                })
            })
        }
    })
    .catch(() => {
        res.status(400).send('Unable to update record in the database.')
    })

})

//Creating User Account for Centers
users.post('/createcenteruser', (req, res) => {
    var user_type = 'employee'
    const created = new Date()
    let {
        first_name,
        middle_initial,
        last_name,
        mobile_no,
        position,
        address,
        email,
        username,
        password,
        confirm_password,
        center_id
    } = req.body

    //Check for the unique username
    User.findOne({
        username: username
    }).then(user => {
        if(user) {
            console.log('Username is already taken...')
            return res.status(500).json({
                error: "true",
                msg: "Username is already taken."
            })
        } else {
                //Check for the unique email
                User.findOne({
                    email: email
                }).then(user => {
                    if(user) {
                        console.log('Email is already registered...')
                        return res.status(500).json({
                            failed: 'true',
                            msg: "Email is already registered."
                        })
                    } else {
                            //The data is valid and user can be registered       
                            let newUser = new User({
                                first_name,
                                middle_initial,
                                last_name,
                                mobile_no,
                                position,
                                address,
                                email,
                                username,
                                password,
                                confirm_password,
                                user_type,
                                created,
                                center_id
                            });
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if(err) throw err;
                                    newUser.password = hash;
                                    newUser.save().then(user => {
                                        // console.log('Saving picture')
                                        //Save Temporary Profile Picture
                                        User.findOne().sort({created: -1}).exec(function(err, info) {
                                            if (err) {return err}
                                            u_id = info.id
                                            //console.log(info.id)
                                        var img = fs.readFileSync('../webapp_project/client/src/assets/images/temp_pic.jpg')
                                        var encode_image = img.toString('base64')
                                        
                                        const TempPicData = {
                                            profile_pic: {
                                                contentType: '"image/jpg"',
                                                data: Buffer.from(encode_image).toString('base64')
                                            },
                                            user_id: u_id,
                                            image_path: '@/assets/images/temp_pic.jpg',
                                            image_name: 'temp_pic.jpg'
                                        }
                                        ProfilePicture.create(TempPicData)
                                        .then(temppic=> {
                                            // res.json({ status: user.email + ' registered' })
                                            console.log('Temporary Profile Picture Saved.')
                                        })
                                        //Create the verification token for the user
                                        /*var token = new Token({ 
                                            _userId: user._id, 
                                            token: crypto.randomBytes(16).toString('hex') 
                                        })
                                        //Save the token
                                        token.save(function(err) {
                                            if (err) {
                                                return res.status(500).send({msg: err.message})
                                            }
                                            var transporter = nodemailer.createTransport({
                                                service: 'Sendgrid', 
                                                auth: {user: process.env.SENDGRID_USERNAME,
                                                pass: process.env.SENDGRID_PASSWORD
                                            }
                                            })
                                            var mailOptions = {
                                                from: 'rondelacruz2020@gmail.com',
                                                to: user.email, 
                                                Subject: 'Account Verification Token',
                                                text: 'Hello, ' + user.first_name + ' ' + user.last_name + '. Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' 
                                            }
                                            transporter.sendMail(mailOptions, function(err) {
                                                if (err) {
                                                    return res.status(500).send({msg: err.message})
                                                }
                                                res.status(200).send('A verification email has been sent to '+ user.email + '.')
                                            })
                                        }) */
                                    })
                                        
                                        return res.status(201).json({
                                            success: 'true',
                                            msg: "User Account for Center successfully registered."
                                        })
                                    })
                                })
                            })
                    }
                })
        }
    })
})

users.get('/displaycenterusers/:id', (req, res) => {
    let id = req.params.id
    //console.log('getting all center users')
    User.find({center_id: id},function (err, users){
        if(err) {
            res.json(err)
        }
        //console.log(center)
        res.json(users)
        
    })
})

//Updating Center Information
users.post('/updatecenterinfo/:id', (req, res) => {
    let id = req.params.id
    console.log(id)
    let {
        center_name,
        center_desc,
        center_head_firstname,
        center_head_middleinitial,
        center_head_lastname,
        center_indivtype,
        center_gender,
        center_location,
        center_yearfounded,
        center_telno,
        center_mobileno,
        center_lat,
        center_lon,
        center_email,
    } = req.body

    CentersProfile.findById(id, function (err, center){
        if(!center){
            // res.status(404).send('Incident report information cannot be found.')
            res.status({ error: err })
        }
        else{
            center.center_name = center_name,
            center.center_desc = center_desc,
            center.center_head_firstname = center_head_firstname,
            center.center_head_middleinitial = center_head_middleinitial,
            center.center_head_lastname = center_head_lastname,
            center.center_indivtype = center_indivtype,
            center.center_gender = center_gender,
            center.center_location = center_location,
            center.center_yearfounded = center_yearfounded,
            center.center_telno = center_telno,
            center.center_mobileno = center_mobileno,
            center.center_email = center_email,
            center.center_lat = center_lat,
            center.center_lon = center_lon
            center.save().then(()=>{
                return res.status(201).json({
                    success: 'true',
                    msg: "Center information successfully updated."
                })
            })
        }
    })
    .catch(() => {
        res.status(400).send('Unable to update record in the database.')
    })
})

users.post("/sendincidentreport", upload.array('imageFiles', 4), (req,res) => {
//users.post('/sendincidentreport', (req, res) => {
    const imgArray = req.files;
    console.log(imgArray.length)
    let imgcontent, imgdata, imgpath, imgname;
    let imgcontent2, imgdata2, imgpath2, imgname2;
    const imgFormat = [];
    const reported_on = new Date()
    let status = "Reported"
    //const rep_by = req.body.reported_by

    for(let i = 0; i < imgArray.length; i++) {
        imgFormat.push(imgArray[i].mimetype.split('/')[1] );
        const img = fs.readFileSync(imgArray[i].path)
        const encode_image = img.toString('base64')
        if(i == 0)
        {
            imgcontent = imgArray[i].mimetype
            imgdata = Buffer.from(encode_image).toString('base64')
            imgpath = imgArray[i].path
            imgname = imgArray[i].filename
        } else if (i > 0) {
            imgcontent2 = imgArray[i].mimetype
            imgdata2 = Buffer.from(encode_image).toString('base64')
            imgpath2 = imgArray[i].path
            imgname2 = imgArray[i].filename
        }
    }

    let newrept_images = {}
    let {
        first_name,
        middle_initial,
        last_name,
        individual_type,
        gender,
        location,
        description,
        center_name,
        center_id,
        user_id,
        distance,
        reported_by
    } = req.body
    
    let newReport = new CitizenReport ({
        first_name,
        middle_initial,
        last_name,
        individual_type,
        gender,
        location,
        description,
        reported_on,
        center_name,
        center_id,
        user_id,
        distance,
        reported_by,
        status,
        report_image1: {
            data: imgdata,
            contentType: imgcontent,
            image_path: imgpath,
            image_name: imgname
        },
        report_image2: {
            data: imgdata2,
            contentType: imgcontent2,
            image_path: imgpath2,
            image_name: imgname2
        }
    })

    newReport.save().then(center => {
        /*if(imgArray) {
            CitizenReport.findOne().sort({reported_on: -1}).exec(function(err, info) {
                    if (err) {return err}
                    rep_id = info._id
                for(let i = 0; i < imgArray.length; i++) {
                    imgFormat.push(imgArray[i].mimetype.split('/')[1] );
                    const img = fs.readFileSync(imgArray[i].path)
                    const encode_image = img.toString('base64')
                    if(i == 0)
                    {
                        imgcontent = imgArray[i].mimetype
                        imgdata = Buffer.from(encode_image).toString('base64')
                        imgpath = imgArray[i].path
                        imgname = imgArray[i].filename
                    } else if (i > 0) {
                        imgcontent2 = imgArray[i].mimetype
                        imgdata2 = Buffer.from(encode_image).toString('base64')
                        imgpath2 = imgArray[i].path
                        imgname2 = imgArray[i].filename
                    }
                }
                console.log(imgcontent2)
                console.log(imgpath2)
                console.log(imgname)
                newrept_images = {
                    report_id: rep_id,
                    incident_rep_img1: {
                        contentType: imgcontent,
                        data: imgdata
                    },
                    incident_rep_img1_path: imgpath,
                    incident_rep_img1_name: imgname,
                    incident_rep_img2: {
                        contentType: imgcontent2,
                        data: imgdata2
                    },
                    incident_rep_img2_path: imgpath2,
                    incident_rep_img2_name: imgname2

                }
                IncidentReportImages.create(newrept_images)
                .then(reptimg1=> {
                    console.log('Reported incident images saved.')
                })
            })
        }*/
        return res.status(201).json({
            success: 'true',
            msg: "Incident Report was successfully sent."
        })
    })

    /*req.body.imageFiles = [];
    for(let i = 0; i < imgArray.length; i++ ) {
        req.body.imageFiles.push(`${uuid.v4()}.${imgFormat[i]}`);
    } */

})
users.get('/getmyincidentreports/:id', (req, res) => {
    let id = req.params.id
    //console.log(id)
    CitizenReport.find({user_id: id}, function (err, report){
        if(err) {
            res.json(err)
        }
        res.json(report)
    })
})

users.get('/getincidentreportimages/:id', (req, res) => {
    let id = req.params.id
    console.log(id)
    IncidentReportImages.find({report_id: id}, function(err, reportimg){
        if(err) {
            res.json(err)
        }
        console.log(reportimg.length)
        res.json(reportimg)
    })
})

users.get('/getreportedincident/:id', (req, res) => {
    let id = req.params.id
    CitizenReport.findById(id, function(err, report){
        if(err) {
            res.json(err)
        }
        res.json(report)
    })
})

users.delete('/deletereportedincident/:id', (req,res) => {
    let id = req.params.id
    console.log(id)
    CitizenReport.findByIdAndRemove({_id: id}, function(err){
        if(err) res.json(err)
        else{
            IncidentReportImages.findOneAndRemove({report_id: id}, function(err){
                console.log('Image successfully deleted...')
            }) 
            res.json('Incident report successfully removed...')
        }
    })
})

users.get('/getcenterincidentreports/:id', (req, res) => { 
    let id = req.params.id
    CitizenReport.find({center_id: id},function(err, report){
        if(err) {
            res.json(err)
        }
        res.json(report)
    })
})

users.post('/updatereportedincident/:id', (req, res) => {
    let id = req.params.id
    CitizenReport.findById(id, function(err, report){
        if(err){
            res.status(404).send('Report was not found.')
        }
        else{
            report.first_name = req.body.first_name,
            report.last_name = req.body.last_name,
            report.individual_type = req.body.individual_type,
            report.gender = req.body.gender,
            /* report.location = {
                blk_st_brgy: req.body.location.blk_st_brgy,
                city_town: req.body.location.city_town,
                province: req.body.location.province
            },*/
            report.location = req.body.location, 
            report.description = req.body.description,
            report.save().then(() => {
                res.json('Reported incident successfully updated...')             
            })
            }
    })
    .catch(() => {
        res.status(400).send('Unable to update the database.')
    })
})



users.post("/uploadcenterpic/:id", upload.single('image_file'), (req,res) => {
    var img = fs.readFileSync(req.file.path)
    var encode_image = img.toString('base64')
    let id = req.params.id
    var ProfilePicData = {
    profile_pic: {
        contentType: req.file.mimetype,
        data: Buffer.from(encode_image).toString('base64')
    },
    user_id: id,
    image_path: req.file.path,
    image_name: req.file.filename
    }
    ProfilePicture.findOneAndUpdate({user_id:id},ProfilePicData)
    .then(profpic => {
        res.json({ status: 'Profile Picture Successfully Uploaded...' })
    })
    .catch(err => {
        res.send('error: ' + err)
    })   

})

module.exports = users