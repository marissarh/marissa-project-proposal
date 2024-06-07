import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    //const jwt = require('jsonwebtoken');

  const secret = process.env.JWT_SECRET || 'my super secret';

 {/*const data = {userId, _id}; 
    let token = jwt.sign({data, secret})
    console.log(token);
jwt.verify(token, secret)*/}

    return jwt.sign({ userId}, secret, {
       expiresIn: '15d'
     
   });
     

};
  


export default generateToken;
