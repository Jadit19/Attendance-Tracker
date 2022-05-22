import React from 'react'

import { NODE_URL } from '../../config'

import './navbar.css'

const Navbar = ({ user }) => {
    const handleLogout = () => {
        // localStorage.clear()
        // window.location.href = "/"

        fetch(NODE_URL + "/logout", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                res.json()
                    .then(res1 => {
                        if (res1.status === 200){
                            localStorage.clear()
                            window.location.href = "/"
                        } else {
                            alert("User not found!")
                        }
                    })
            })
    }

    return (
        <nav>
            <a className="nav__left" href="/">
                AT
            </a>
            <div className="nav__right">
                {
                    user ?
                    <>
                        <a className="nav__option" href="/welcome">{ user.name }</a>
                        <div className="nav__option" onClick={handleLogout}>Logout</div>
                    </>:
                    <>
                        <a className="nav__option" href="/student">
                            Student
                        </a>
                        <a className="nav__option" href="/teacher">
                            Teacher
                        </a>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar