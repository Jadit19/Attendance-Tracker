import React from 'react'

import { logout } from '../../Actions/node'

import './navbar.css'

const Navbar = ({ user }) => {
    const handleLogout = () => {
        logout(user)
            .then((res) => {
                if (res.data.status === 200){
                    localStorage.clear()
                    window.location.href = "/"
                } else {
                    alert("Invalid Session!")
                }
            })
            .catch((err) => {
                alert('Something went wrong!')
                console.log(err)
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