import React, { useRef } from 'react'
import Webcam from 'react-webcam'

import { postImg } from '../../Actions/flask'
import { postStudentLogin, logout } from '../../Actions/node'

const Student = ({ user, setUser, setUserImage }) => {
    const webcamRef = useRef(null)

    const handleLogout = () => {
        logout(user)
            .then((res) => {
                if (res.data.status === 200){
                    setUser(null)
                } else {
                    alert("Invalid Session!")
                    return
                }
            })
            .catch((err) => {
                alert("Something went wrong!")
                console.log(err)
                return
            })
    }

    const handleClick = () => {
        const base64Img =  webcamRef.current.getScreenshot()

        postImg({
            base64Img: base64Img
        })
            .then((res) => {
                if (res.data.name === "__404__")
                    alert("No Face detected! Please try again..")
                else if (res.data.name === "__multiple__")
                    alert("Multiple Faces detected! Please try again..")
                else if (res.data.name === "__denied__")
                    alert("Unknown User!")
                else {
                    postStudentLogin({
                        name: res.data.name,
                        hour: res.data.hour,
                        date: res.data.date
                    })
                        .then((_res) => {
                            if (_res.data.status === 200){
                                setUser({
                                    name: res.data.name,
                                    hour: res.data.hour,
                                    date: res.data.date
                                })
                                setUserImage(res.data.image)
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
            {
                user ?
                <>
                    <h1>{ user.name } is already logged in. Please logout first to proceed.</h1>
                    <button className='btn__primary' onClick={handleLogout}>Logout</button>
                </> :
                <>
                    <Webcam width={
                        window.outerWidth < 600 ?
                        window.innerWidth - 40 :
                        window.innerWidth / 2
                    } style={{transform: 'scaleX(-1)'}}
                    ref={webcamRef} />
                    <button className='btn__primary' onClick={handleClick}>Capture</button>
                </>
            }
        </div>
    )
}

export default Student