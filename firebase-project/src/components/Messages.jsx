import React, { useEffect, useRef, useState} from 'react'
import './Messages.css'
import MessageText from './MessageText'
import Send from './Send'
import { db}  from '../firebase'
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  
  useEffect(() => {
    const q = query(collection(db,'messages'), orderBy('timestamp'))
    const unsubscribe = onSnapshot(query(collection(db, 'messages'), orderBy('timestamp')), (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id});
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
    <div className='message'>
      {messages && messages.map((message) => (
        <MessageText key={message.id} message={message}/>
      ))}
      
    </div>
    <Send scroll={scroll}/>
    <span ref={scroll}></span>
    
    </>
  )
}

export default Message