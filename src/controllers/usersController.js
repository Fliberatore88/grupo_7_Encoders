const { validationResult } = require("express-validator")

const User = require ('../../MODELOPRUEBA/User')
const bcryptjs = require ('bcryptjs')
const usersController = {
  index: (req,res) => {

  },
  register: (req,res) => {
    res.render('./users/register')
  },
  create: (req,res) => {
    
  const resultValidation = validationResult(req)
  console.log(req.file)
  if (resultValidation.errors.length > 0 ){
    return res.render('./users/register', { errors: resultValidation.mapped(), old: req.body })
  }
  
    let userByEmailInDB = User.findByField('email', req.body.email);
    let userByUsernameDB = User.findByField('username', req.body.username);

      if  (userByEmailInDB || userByUsernameDB ) {
        return res.render('./users/register', { errors:{
          email: {
            msg: 'Este email ya está registrado'
          },
          username: {
            msg: 'Este username ya está registrado'
          }
        }, old: req.body })
      }
   

    let userToCreate =  {
    ...req.body,
    password: bcryptjs.hashSync(req.body.password, 10),
    image: req.file.filename,
  }
    let userCreated = User.create(userToCreate)
    return res.redirect('/users/login')
  },
  edit: (req,res) => {

  },
  update: (req,res) => {

  },
  login: (req,res) => {

    res.render('./users/login')
  },

  enterLogin: (req,res) => {
      let userToLogin = User.findByField('email', req.body.email)
   /* const errors = validationResult(req)
    if (errors.isEmpty()){
      res.render('./users/login', {msg: 'Mensaje todo OK',old: req.body})
  } else {
      res.render('./users/login', {errors: errors.mapped(), old: req.body})
  }*/
    if(userToLogin) {
      let isPasswordOk = bcryptjs.compareSync(req.body.password, userToLogin.password)
      if (isPasswordOk){ 
        delete userToLogin.password
        req.session.userLogged = userToLogin;
        return res.redirect('/users/userProfile')
      }
      return res.render('./users/login', { errors: {
        email: {
          msg: 'Las credenciales son inválidas'
        }
      }
  
      })
    }
    return res.render('./users/login', { errors: {
      email: {
        msg: 'El Email ingresado no se encuentra registrado'
      }
    }

    })
  },
  profile: (req,res) => {
    
    res.render('./users/userProfile',  {
      user: req.session.userLogged
    })
  },
  admin: (req,res) => {
    res.render ('./users/register')
  }
}

module.exports = usersController;