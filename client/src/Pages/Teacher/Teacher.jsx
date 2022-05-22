import React, { useState } from 'react'
import StudentItem from '../../Components/StudentItem/StudentItem'

import { NODE_URL } from '../../config'

import './teacher.css'

const Teacher = () => {
    const [isTeacher, setIsTeacher] = useState(false)
    const [password, setPassword] = useState('')
    const [students, setStudents] = useState([])

    const handleChange = (e) => {
        setPassword(e.target.value)
    }

    const handleReset = () => {
        setPassword('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(NODE_URL + "/password", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password
            })
        })
            .then(res => {
                res.json()
                    .then(res1 => {
                        if (res1.status === 200){
                            console.log(res1.data)
                            setStudents(res1.data)
                            console.log(students)
                            setIsTeacher(true)
                        }
                        else
                            alert("Access Denied!")
                })
            })
    }

    return (
        <div className='main__container'>
            {
                isTeacher ?
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <table>
                        <thead>
                            <tr>
                                <td className='table__name' style={{ fontSize: '1.5rem' }}>NAME</td>
                                <td className='table__hour' style={{ fontSize: '1.5rem' }}>TIME</td>
                                <td className='table__date' style={{ fontSize: '1.5rem' }}>DATE</td>
                            </tr>
                        </thead>
                        {
                            students.forEach((sData, idx) => {
                                return (
                                    <StudentItem key={idx} studentData={sData} />
                                )
                            })
                        }
                    </table>
                </div> :
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <h1>Welcome Teacher! Enter the password</h1>
                    <input type='password' value={password} onChange={handleChange} />
                    <div className="btn__container">
                        <button className='btn__primary' type='submit'>Submit</button>
                        <button className='btn__primary' type='reset'>Clear</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default Teacher