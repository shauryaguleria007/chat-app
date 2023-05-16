const express = require('express')
const { check } = require('express-validator')
const multer = require("multer")
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');



const { createUser, findUser, addContact, addMessage, getMessages, addFile, getFile } = require('../controller')
const { routeValidator } = require('../middleware')
const passport = require("passport")

const storage = new GridFsStorage({
  url: process.env.mongoDB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = uuidv4() + path.extname(file.originalname);
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads'
      }
      resolve(fileInfo);
    });

  }
});



const upload = multer({ storage: storage })


const Router = express.Router()

Router.route('/register').post(
  [
    check('email').exists().isEmail(),
    check('password').exists().isLength({ min: 5 }),
    check('name').exists().isLength({ min: 3 }), // update name checker
  ],
  routeValidator,
  createUser
)

Router.route("/findUser").post(passport.authenticate("jwt", { session: false }), findUser)
Router.route("/addContact").post(passport.authenticate("jwt", { session: false }), addContact)
Router.route("/addMessage").post(passport.authenticate("jwt", { session: false }), addMessage)
Router.route("/getMessages").post(passport.authenticate("jwt", { session: false }), getMessages)
Router.route("/addFile").post(passport.authenticate("jwt", { session: false }), upload.single("file"), addFile)
Router.route("/getFile").post(passport.authenticate("jwt", { session: false }), getFile)




module.exports = Router
