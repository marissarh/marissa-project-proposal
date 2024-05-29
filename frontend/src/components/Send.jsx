import React, { useState } from 'react'
import './Send.css'
import { auth, db} from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Send = ({scroll}) => {
    const [input, setInput] = useState(' '); 

    const sendMessage = async (e) => {
        e.preventDefault()
        if (input.trim() === ' '){
            alert('No message entered')
            return
        }
        const { uid, displayName} = auth.currentUser;
        try{
            await addDoc(collection(db, 'messages'), {
            text: input,
            userName: displayName,
            uid,
            sentByCurrentUser: true,
            timestamp: serverTimestamp()
        });
        setInput(' ')
        scroll.current.scrollIntoView({behavior: 'smooth'});
        } catch (error){
            console.error('Error sending message:', error);
        };
        
        
        
    }


  return (
    <form className='form' onSubmit={sendMessage}>
        <input className='input' 
        type='text' 
        placeholder='Message' 
        value={input}
        onChange={(e) => setInput(e.target.value)}/>
        <button onClick={sendMessage}>Send</button>
    </form>
  )
}

export default Send