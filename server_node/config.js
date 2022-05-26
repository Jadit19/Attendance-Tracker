const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.NODE_SERVER_PORT
const MONGO_URL = process.env.MONGO_URL
const PASSWORD = String(process.env.PASSWORD)

module.exports = { PORT, MONGO_URL, PASSWORD }