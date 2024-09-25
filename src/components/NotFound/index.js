import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='minHeight'>
      <p className='text-center'>Page Not Found Please go to <Link to='/' >Home Page</Link></p>
    </div>
  )
}

export default NotFound
