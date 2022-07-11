const isImageURL = require('image-url-validator').default;

const isValidImageURL = async (url) => {
  const result = await isImageURL(url)
  return result
}

module.exports = isValidImageURL