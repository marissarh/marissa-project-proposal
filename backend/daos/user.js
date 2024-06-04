
const User = require('../models/user.js');

module.exports.findAllUsers = async () => {
    return User.find().select('-password');
};

module.exports.findUserById = async (id) => {
    return User.findUserById(id).select('-password');
};
module.exports.findUserByUsername = async (username) => {
    return User.findOne({ username}).select('-password');
};
module.exports.createUser = async (data) => {
    const newUser = new User(data);
    return newUser.save();
};
