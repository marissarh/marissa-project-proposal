const Message = require('../models/message.js');

module.exports.findAllMessages = async () => {
    return Message.find();
};
module.exports.findMessageById = async (id) =>{
    return Message.findById(id);
};

module.exports.createMessage = async (data) => {
    const newMessage = new Message(data);
    return newMessage.save();
};