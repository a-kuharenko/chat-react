const { saveData, updateData,
    deleteData, findUserById } = require('../repositories/user.repository');

const fs = require('fs');
const path = './source/users.json';
  
const getUsers = (id) => {
    const users = JSON.parse(fs.readFileSync(path));
    if (!id)
        return users;
    return findUserById(id, users);
};
  
const createUser = user => {
    if (user)
      return saveData(user);
    return null;
};
  
const updateUser = (id, user) => {
    if (id && user)
      return updateData(id, user);
    return null;
};
  
const deleteUser = id => {
    if (id)
      return deleteData(id);
    return null;
};

module.exports = { getUsers, createUser, updateUser, deleteUser };