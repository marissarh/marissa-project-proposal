import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { auth} from './firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import Messaging from './components/Messaging'

function App() {
  const [user] = useAuthState(auth)
  //console.log(user)

  return (
    <>
    <div>
    <section>
          <div >
            <div className='appContainer'>
              <Navbar />
            </div>
          {user ? <Messaging/> : null}
          </div>
        </section> 
        
     </div>
    </>
  )
}

export default App
