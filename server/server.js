const express = require('express');
const app = express();
const server = require('http').Server(app);
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bodyParser = require('body-parser');

const { getUsers, createUser, updateUser, deleteUser} = require('./services/user.service');
const { likeMessage, getMessages, deleteMessage, saveMessage, updateMessage } = require('./services/chat.service');

require('./passport.config');

server.listen(8000);

app.use(passport.initialize());
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  const result = getUsers();
  if(result)
    res.status(200).json([...result]);
  else
    res.status(400).send('Error in getting users');
});

app.get('/user/:id', (req, res) => {
  const user = getUsers(req.params.id);
  if(user)
    res.status(200).json({...user});
  else
    res.status(400).send(`No user with such id(${req.params.id})`);
});

app.post('/user', (req, res) => {
  const result = createUser(req.body);

  if(result)
    res.status(200).json({});
  else
    res.status(400).send('Error in creating user');
});

app.put('/user/:id', (req, res) => {
  const result = updateUser(req.params.id, req.body);

  if (result)
    res.status(200).json({});
  else
    res.status(400).send('Error in updating user');
});

app.delete('/user/:id', (req, res) => {
  const result = deleteUser(req.params.id);

  if (result)
    res.status(200).json({});
  else
    res.status(400).send('Error in deleting user');
});


app.get('/chat/:token', (req, res) => {
  const token = req.params.token;
  const users = getUsers();
  const user = jwt.verify(token, 'secret');
  const messages = getMessages();
    if(user){
      const chat = {
        chatName: 'My chat',
        participants: users.length,
        lastMessageDate: messages[messages.length - 1].created_at,
        messages,
        user: user.login,
    }
    res.status(200).json({...chat})
  }
  else {
    res.status(401);
  }
});

app.put('/chat/like/:id', (req, res)=>{
  const id = req.params.id;
  const { sign } = req.body;

  const result = likeMessage(id, sign);
  if(result)
    res.status(200).json({});
  else
    res.status(400).send('Error in like message');
})

app.delete('/chat/:id', (req, res) => {
  const result = deleteMessage(req.params.id);

  if (result)
    res.status(200).json({});
  else
    res.status(400).send('Error in deleting message');
})

app.post('/chat', (req, res) => {
  const {id, message, user , date} = req.body;
  const users = getUsers();
  const userFromDB = users.find(userFromDB => userFromDB.login === user);
  const avatar = userFromDB.avatar;
  const newMessage = {
    id,
    message,
    user,
    avatar,
    created_at: date,
    marked_read: false,
  }

  const result = saveMessage(newMessage);
  if(result)
    res.status(200).json({});
  else 
    res.status(400).send('Error in saving message');
})

app.put('/chat/:id', (req, res) => {
  const {message, date} = req.body;
  const id = req.params.id;
  
  const result = updateMessage(id, message, date);
  if(result)
    res.status(200).json({});
  else 
    res.status(400).send('Error in updating message');
})

app.post('/login', (req, res) => {
  const users = getUsers();
  const userFromReq = req.body;
  const userInDB = users.find(user => user.login === userFromReq.login);
  if (userInDB && userInDB.password === userFromReq.password) {
    const token = jwt.sign(userInDB, 'secret');
    const role = userInDB.login === 'admin' ? 'admin' : 'user';
    res.status(200).json({ 
      auth: true, 
      token, 
      login: userInDB.login,
      passport: userInDB.password, 
      role 
    });
  } else {
    res.status(401).json({ auth: false });
  }
});

app.put('/login', (req, res) => {
  const {token} = req.body;
  const user = jwt.verify(token, 'secret');
  if (user) {
    const role = user.login === 'admin' ? 'admin' : 'user';
    res.status(200).json({...user, role, token});
  } else {
    res.status(401).json({ auth: false });
  }
});