const fs = require('fs');
const path = './source/users.json';
const findUserById = (id, users) => {
  let User;
  users.forEach((user) => {
    if (+user.id === +id)
      User = user;
  });
  return User;
};

const saveData = data => {
  if (data) {
    const users = JSON.parse(fs.readFileSync(path, 'utf8'));
    users.push(data);
    fs.writeFileSync(path, JSON.stringify(users), 'utf8');
    return true;
  }
  return false;
};

const updateData = (id, data) => {
  if (id && data) {
    let users = JSON.parse(fs.readFileSync(path, 'utf8'));
    users = users.map(user => {
      if(+user.id === +id){
        user = data;
      }
      return user;
    })
    fs.writeFileSync(path, JSON.stringify(users), 'utf8');
    return true;
  }
  return false;
};

const deleteData = id => {
  if (id) {
    let users = JSON.parse(fs.readFileSync(path, 'utf8'));
    users = users.filter(user => +user.id !== +id)
    fs.writeFileSync(path, JSON.stringify(users), 'utf8');
    return true;
  }
  return false;
};

module.exports = { saveData, updateData, deleteData, findUserById };