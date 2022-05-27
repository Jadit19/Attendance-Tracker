// ! IMPORTS----------------------
import React, { useState } from 'react'
import StudentItem from '../../Components/StudentItem/StudentItem'
import { getStudentData, logout } from '../../Actions/node'
import useSortableData from '../../Hooks/useSortableData'
import './teacher.css'

const Teacher = ({ user, setUser }) => {
    
    // declaring state variables
    const [isTeacher, setIsTeacher] = useState(false)
    const [studentData, setStudentData] = useState([])
    const [password, setPassword] = useState('')
    
    const { items, requestSort } = useSortableData(studentData)

    // function to update password while the text is entered
    const handleChange = (e) => {
        setPassword(e.target.value)
    }
    
    // function to reset the password
    const handleReset = () => {
        setPassword('')
    }

    // function for logging out a student
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

    // function for getting student data once password is submitted
    const handleSubmit = (e) => {
        e.preventDefault() // preventing page from refreshing on submitting password

        getStudentData({
            password: password
        })
            .then((res) => {
                if (res.data.status === 403){
                    alert("Password is Incorrect! Please Try Again...") // error message shown on incorrect password
                    setPassword('')
                } else { // if password entered is correct
                    setStudentData(res.data.data) 
                    setIsTeacher(true)
                }
            })
    }

    return (
        <div className='main__container'>
            {
                user ? // if a student is already logged in when the '/teacher' page is opened
                <>
                    <h1>{ user.name } is already logged in. Please logout first to proceed.</h1>
                    <button className='btn__primary' onClick={handleLogout}>Logout</button>
                </> : (
                    isTeacher ? // displaying the currently logged in students
                    <> 
                        <h1 style={{width: 'calc(100% - 40px)', padding: '20px' }}><center>Students currently logged in:</center></h1>
                        <br/><br/>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <td className='table__roll' style={{ fontSize: '1.2rem' }} onClick={() => requestSort('roll')}>R. NO.</td>
                                        <td className='table__name' style={{ fontSize: '1.2rem' }} onClick={() => requestSort('name')}>NAME</td>
                                        <td className='table__hour' style={{ fontSize: '1.2rem' }} onClick={() => requestSort('hour')}>TIME</td>
                                        <td className='table__date' style={{ fontSize: '1.2rem' }} onClick={() => requestSort('date')}>DATE</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items.map((sData, idx) => (
                                            <StudentItem key={idx} studentData={sData}></StudentItem> // showing student data in the body of the table
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div><br/><br/>
                        <p><center>Note: Click on a column header to sort the table entries according to the entries in that column</center></p>
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