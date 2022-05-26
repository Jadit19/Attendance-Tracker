import React from 'react'
// Welcome page (shown after login)
const Welcome = ({ user, userImg }) => {
    return (
        <div className='main__container'>
            {
                user ? // if a student is logged in
                <div>
                    <h1 style={{ paddingBottom: '20px' }}>Welcome, { user.name }!</h1>
                    <img src={userImg} alt="Student" />
                    <p style={{ paddingTop: '20px' }}>
                        Logged in at: { user.hour }, { user.date }
                    </p>
                </div> : // if no student is logged in
                <h1>No User Logged In</h1>
            }
        </div>
    )
}

export default Welcome