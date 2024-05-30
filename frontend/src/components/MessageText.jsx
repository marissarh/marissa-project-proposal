import React from 'react'
import './MessageText.css'
import { auth} from '../firebase'


const MessageText = ({message}) => {
    const messageUser = message.uid === 
    auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
    <div className={`message ${messageUser}`}>
    <p className='username'>{message.userName}</p>
    <div className='message'> {message.text}</div>
    </div>
    </>
  )
}

export default MessageText