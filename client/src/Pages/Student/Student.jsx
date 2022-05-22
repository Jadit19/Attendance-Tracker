import React, { useRef } from 'react'
import Webcam from 'react-webcam'

import { postImg } from '../../Actions/flask'
import { postStudentLogin } from '../../Actions/node'

const Student = ({ setUser, setUserImage }) => {
    const webcamRef = useRef(null)

    const handleClick = () => {
        const base64Img =  webcamRef.current.getScreenshot()
        
        postImg({
            base64Img: base64Img
        })
            .then((res) => {
                if (res.data.name === "__404__")
                    alert("No Face Detected!")
                else if (res.data.name === "__denied__")
                    alert("Unknown User!")
                else {
                    postStudentLogin(res.data)
                        .then((_res) => {
                            if (_res.data.status === 200){
                                setUser(res.data)
                                setUserImage(base64Img)
                                window.location.href = "/welcome"
                            } else {
                                alert("Please try again..")
                            }
                        })
                        .catch((_err) => {
                            alert("Something went wrong!")
                            console.log(_err)
                        })
                }
            })
            .catch((err) => {
                alert("Something went wrong!")
                console.log(err)
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