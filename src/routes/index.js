const express = require("express")
const router = express.Router()

const RandomController = require("../controllers/random")
const UploadController = require("../controllers/upload")

router.get('/random', RandomController.handleRandomSelect)

router.post('/upload', UploadController.handleUpload)

module.exports = router