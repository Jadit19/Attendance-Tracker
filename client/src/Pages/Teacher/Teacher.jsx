import React, { useState } from 'react'
import StudentItem from '../../Components/StudentItem/StudentItem'

import { getStudentData, logout } from '../../Actions/node'

import './teacher.css'

const Teacher = ({ user, setUser }) => {
    const [isTeacher, setIsTeacher] = useState(false)
    const [studentData, setStudentData] = useState([])
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        setPassword(e.target.value)
    }

    const handleReset = () => {
        setPassword('')
    }

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

    const handleSubmit = (e) => {
        e.preventDefault()

        getStudentData({
            password: password
        })
            .then((res) => {
                if (res.data.status === 403){
                    alert("Access Denied!")
                    setPassword('')
                } else {
                    setStudentData(res.data.data)
                    setIsTeacher(true)
                }
            })
    }

    return (
        <div className='main__container'>
            {
                user ? 
                <>
                    <h1>{ user.name } is already logged in. Please logout first to proceed.</h1>
                    <button className='btn__primary' onClick={handleLogout}>Logout</button>
                </> : (
                    isTeacher ?
                    <>
                        <h1 style={{width: 'calc(100% - 40px)', padding: '20px' }}><center>Students currently logged in:</center></h1>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <td className='table__name' style={{ fontSize: '1.5rem' }}>NAME</td>
                                        <td className='table__hour' style={{ fontSize: '1.5rem' }}>TIME</td>
                                        <td className='table__date' style={{ fontSize: '1.5rem' }}>DATE</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studentData.map((sData, idx) => (
                                            <StudentItem key={idx} studentData={sData}></StudentItem>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </> :
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <h1>Welcome Teacher! Enter the password</h1>
                        <input type='password' value={password} onChange={handleChange} />
                        <div className="btn__container">
                            <button className='btn__primary' type='submit'>Submit</button>
                            <button className='btn__primary' type='reset'>Clear</button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default Teacher