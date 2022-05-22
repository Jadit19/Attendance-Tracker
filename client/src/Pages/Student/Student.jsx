import React, { useRef } from 'react'
import Webcam from 'react-webcam'

import { FLASK_URL, NODE_URL } from '../../config'

const Student = ({ setUser, setUserImage }) => {
    const webcamRef = useRef(null)

    const handleClick = () => {
        const base64Img =  webcamRef.current.getScreenshot()
        
        fetch(FLASK_URL + "/post_img", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(base64Img)
        })
            .then(res => {
                res.json()
                    .then(res1 => {
                        if (res1.name === "__404__")
                            alert("No Face Detected!")
                        else if (res1.name === "__denied__")
                            alert("Unknown User!")
                        else {
                            setUser(res1)
                            setUserImage(base64Img)
                            fetch(NODE_URL + `/student`, {
                                method: "POST",
                                headers:{
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(res1)
                            })
                            window.location.href = "/welcome"
                        }
                    })
            })
    }

    return (
        <div className="main__container">
            <Webcam width={
                window.outerWidth < 600 ?
                window.innerWidth - 40 :
                window.innerWidth / 2
            } style={{transform: 'scaleX(-1)'}}
            ref={webcamRef} />
            <button className='btn__primary' onClick={handleClick}>Capture</button>
        </div>
    )
}

export default Student