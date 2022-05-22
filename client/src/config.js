import axios from 'axios'

const FLASK_URL = "http://127.0.0.1:5000"
const NODE_URL = "http://localhost:8000"

export const FLASK_API = axios.create({
    baseURL: FLASK_URL
})
export const NODE_API = axios.create({
    baseURL: NODE_URL
})