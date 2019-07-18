const fs = require('fs');
const path = './source/messages.json';

const saveData = (id, sign) => {
    if(id && sign){
        let messages = JSON.parse(fs.readFileSync(path));
        messages = messages.map(message => {
            if(+message.id === +id){
                let likes = message.likes || 0;
                likes += sign;
                message.likes = likes;
            }
            return message;
        })
        fs.writeFileSync(path, JSON.stringify(messages), 'utf8');
        return true;
    }
    return false;
}

const deleteData = id => {
    if (id) {
      let messages = JSON.parse(fs.readFileSync(path, 'utf8'));
      messages = messages.filter(message => +message.id !== +id)
      fs.writeFileSync(path, JSON.stringify(messages), 'utf8');
      return true;
    }
    return false;
};

const addMessage = message => {
    if(message){
        let messages = JSON.parse(fs.readFileSync(path, 'utf8'));
        messages.push(message);
        fs.writeFileSync(path, JSON.stringify(messages), 'utf8');
        return true;
    }
    return false;
}

const updateData = (id, message, date) => {
    if(message){
        let messages = JSON.parse(fs.readFileSync(path, 'utf8'));
        messages.map(messageFromDB => {
            if(+messageFromDB.id === +id){
              messageFromDB.message = message;
              messageFromDB.created_at = date;
            }
              return messageFromDB;
          })
        fs.writeFileSync(path, JSON.stringify(messages), 'utf8');
        return true;
    }
    return false;
}
module.exports = { saveData, deleteData, addMessage, updateData };