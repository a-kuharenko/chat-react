
const { saveData, updateData,
    deleteData, addMessage } = require('../repositories/chat.repository');

const fs = require('fs');
const path = './source/messages.json';

const getMessages = (id) => {
    const messages = JSON.parse(fs.readFileSync(path));
    return messages;
};    

const likeMessage = (id, sign) => {
    if(id && sign)
        return saveData(id, sign);
    return null;
};

const deleteMessage = id => {
    if (id)
        return deleteData(id);
    return null;
}

const saveMessage = message => {
    if(message)
        return addMessage(message);
    return null;
}

const updateMessage = (id, message, date) => {
    if(id && message && date)
        return updateData(id, message, date);
    return null;
}

module.exports = {getMessages, likeMessage, deleteMessage, saveMessage, updateMessage};