import React from 'react'
import './Logout.css'
import { auth} from '../firebase'

const Logout = () => {
    const signOut = () => {
        signOut(auth)
    }
  return (
    <>
    <button className='logout' 
    onClick={() => auth.signOut()}>Logout</button>
    </>
  )
}

export default Logout