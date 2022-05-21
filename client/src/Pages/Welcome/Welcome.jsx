import React from 'react'

const Welcome = ({ user, userImg }) => {
    return (
        <div className='main__container'>
            {
                user ?
                <div>
                    <h1 style={{ paddingBottom: '20px' }}>Welcome, { user.name }!</h1>
                    <img src={userImg} />
                    <p style={{ paddingTop: '20px' }}>
                        Logged in at: { user.hour }, { user.date }
                    </p>
                </div> :
                <h1>No User Logged In</h1>
            }
        </div>
    )
}

export default Welcome