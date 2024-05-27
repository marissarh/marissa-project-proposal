import React, { useState } from 'react'
import './Send.css'
import { auth, db} from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Send = () => {
    const [input, setInput] = useState(' ');    
    const sendMessage = async (e) => {
        e.preventDefault()
        if (input === ' '){
            alert('No message entered')
            return
        }
        const {uid, displayName} = auth.currentUser 
        await addDoc(collection(db, 'messages'), {
            text: input,
            userName: displayName,
            uid,
            timestamp: serverTimestamp()
        })
        setInput(' ')
        
    }


  return (
    <form className='form' onSubmit={sendMessage}>
        <input className='input' 
        type='text' 
        placeholder='Message' 
        value={input}
        onChange={(e) => setInput(e.target.value)}/>
        <button type='submit'>Send</button>
    </form>
  )
}

export default Send