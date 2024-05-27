import React, {useEffect, useRef, useState} from 'react'
import './Messaging.css'
import Message from './Message'
import Send from './Send'
import { db} from '../firebase'
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

const Messaging = () => {
    const [messages, setMessages] = useState([]);
    
    useEffect(() =>{
        const dbMessages = query(collection(db, 'messages'), orderBy('timestamp'))
        const  dbData = onSnapshot(dbMessages, (querySnapshot) => {
            let messages = []
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id});
        });
        setMessages(messages);
    });
        return () => dbData();
    }, []);
  return (
    <>
    <div className='messaging'>
        {messages && messages.map((message) => (
            <Message key={message.id} message={message}/>
        ))}
        </div>
        <Send />
 </>
  );
};

export default Messaging