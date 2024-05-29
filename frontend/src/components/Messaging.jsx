import React, {useEffect, useRef, useState} from 'react'
import './Messaging.css'
import Message from './Message'
import Send from './Send'
import { db} from '../firebase'
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

const Messaging = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();
    
    useEffect(() =>{
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
    <div className='messaging'>
        {messages.map((message) => (
            <Message key={message.id} message={message}/>
        ))}
        </div>
        <Send scroll={scroll}/>
        <span ref={scroll}></span>
 </>
  );
};

export default Messaging