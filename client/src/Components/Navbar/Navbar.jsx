import React from 'react'

import './navbar.css'

const Navbar = ({ user }) => {
    const handleClick = () => {
        localStorage.clear()
        window.location.href = "/"
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
                        <div className="nav__option">{ user.name }</div>
                        <div className="nav__option" onClick={handleClick}>Logout</div>
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