import { NODE_API } from "../config"
// used for sending/receiving data to/from the node server 
export const getStudentData = (_data) => NODE_API.post("/password", (_data))
export const postStudentLogin = (_data) => NODE_API.post("/student", (_data))
export const logout = (_data) => NODE_API.post('/logout', _data)