const Images = require("../models/Image")
const isValidImageURL = require('../../utils/isValidImageURL')

const handleUpload = async (req, res) => {
  const validUpload = req.body && req.body.url && typeof req.body.url === "string" && (req.body.url).length <= 500
  const validURL = validUpload && await isValidImageURL(req.body.url)
  if (validUpload && validURL) {
    await Images.create({
      "url": req.body.url
    })

    res.status(201).json({
      message: 'Successfully uploaded image',
    })
  } else {
    res.status(400).json({
      message: 'Invalid image URL string',
    })
  }
}

module.exports = {
  handleUpload: handleUpload
}