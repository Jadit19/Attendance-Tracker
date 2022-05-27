const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.NODE_PORT || 8000
const PASSWORD = process.env.PASSWORD

module.exports = { PORT, PASSWORD }