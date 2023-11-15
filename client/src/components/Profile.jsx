import React from 'react'

const Profile = (props) => {
  return (
    <div className='d-flex justify-content-center align-items-center text-center'>
      <p>Welcome, {props.user.username}</p>
    </div>
  )
}

export default Profile