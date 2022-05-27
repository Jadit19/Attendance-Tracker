import axios from 'axios'
// import dotenv from 'dotenv'

// dotenv.config()

const FLASK_PORT = process.env.FLASK_PORT || 5000
const NODE_PORT = process.env.NODE_PORT || 8000

const FLASK_URL = `http://127.0.0.1:${FLASK_PORT}`
const NODE_URL = `http://localhost:${NODE_PORT}`

export const FLASK_API = axios.create({
    baseURL: FLASK_URL
})
export const NODE_API = axios.create({
    baseURL: NODE_URL
})