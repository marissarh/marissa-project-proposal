import React from 'react'
import {auth } from '../firebase'
import './Message.css'

const Message = ({message}) => {
    const messageUser = 
    message.uid === auth.currentUser.uid
    ? 'sent' : 'received';
    

  return (
    <><div> 
    
    <div className={`message${messageUser}`}>
    <p className='username'>{message.userName}</p>
    <div className='message'>{message.text}</div>
    
  
    </div>
    </div>
    </>
  )
}

export default Message