import { FLASK_API } from "../config"
// used for sending/receiving the image data to/from the flask server
export const postImg = (_data) => FLASK_API.post("/post_img", (_data))