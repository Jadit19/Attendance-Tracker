const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.NODE_SERVER_PORT
const PASSWORD = String(process.env.PASSWORD)

module.exports = { PORT, PASSWORD }