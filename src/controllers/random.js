const Images = require("../models/Image")
const config = require('../../config')

const RANDOM_COUNT_LIMIT = config.RANDOM_COUNT_LIMIT //25

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handleRandomSelect = async (req, res) => {
  let limit = 1

  if (req.query.count && typeof Number(req.query.count) === "number") {
    limit = Number(req.query.count)
  }
  if (limit > RANDOM_COUNT_LIMIT) {
    limit = RANDOM_COUNT_LIMIT
  }

  const images = await Images.aggregate([{ $sample: { size: limit } }])
  const filtered = images.map(({ url }) => url)

  if (limit === 1) {
    res.json({
      message: filtered[0],
    })
  } else {
    res.json({
      message: filtered,
    })
  }
}

module.exports = {
  handleRandomSelect: handleRandomSelect
}