const fs = require ('fs')

const User =  {
  filename: './data/users.json',
  getData: function () { 
      return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
  },

  generateId: function () {
    let allUsers = this.findAll();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id+1;
    }
    return 1;
    
  },
  findAll: function () {
    return this.getData();
  },

  findByPk: function(id) {
      let allUsers =  this.findAll();
      let userFound = allUsers.find(user => user.id === id)
      return userFound
  },

  findByField: function(field, text) {
    let allUsers =  this.findAll();
    let userFound = allUsers.find(userField => userField[field] === text)
    return userFound
},

  create: function (userData) {
    let allUsers =  this.findAll();
    let newUser = {
      id: this.generateId(),
      ...userData
    }
    allUsers.push(newUser);
    fs.writeFileSync(this.filename, JSON.stringify(allUsers, 'utf-8', 2))
    return newUser
  },
  delete: function (id) {
    let allUsers =  this.findAll();
    let finalUsers = allUsers.filter (user => user.id !== id)
    fs.writeFileSync(this.filename, JSON.stringify(finalUsers, 'utf-8', 2))
    return true;
  }
}

module.exports = User;