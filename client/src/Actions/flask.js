import { FLASK_API } from "../config"

export const postImg = (_data) => FLASK_API.post("/post_img", (_data))