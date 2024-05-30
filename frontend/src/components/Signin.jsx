import React from 'react'
import './Signin.css'
import { GoogleAuthProvider,signInWithRedirect } from 'firebase/auth'
import { auth } from '../firebase'
import GoogleButton from 'react-google-button'

const googleSignin = () => { 
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
}
const Signin = () => {

  return (
    <div className='button'>
        <GoogleButton onClick={googleSignin}/>
    </div>
  )
}

export default Signin