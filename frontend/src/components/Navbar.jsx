import React from 'react'
import './Navbar.css'
import Signin from './Signin'
import Logout from './Logout'
import { auth } from '../firebase'
import { useAuthState} from 'react-firebase-hooks/auth'

const Navbar = () => {
    const [user] = useAuthState(auth)
    console.log(user)
  return (
    <div>
        <h1>Messaging App</h1>
        {user ? <Logout/> : <Signin/>}
        </div>
  )
}

export default Navbar