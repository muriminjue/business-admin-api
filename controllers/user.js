var db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv')

dotenv.config()
const salt = 12;

const add = async (req, res) => {
    var username = req.body.username
    var password= req.body.password
    var admin = await db.User.findOne({ where: { username: username }})
    if (!password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }
    if (admin) {
        return res.status(400).json({ msg: 'user exists' });
      } 
    await db.User.create({
        username: username,
        password: await  bcrypt.hash(password, salt),
        permissions: 1, // req.body.permissions,
    });
  
    res.status(200).send("Submitted");
}



const login = async (req, res) => {
    var { username, password} = req.body
    if (!username || !password){
        res.status(400).json({ msg: "Enter all credentials"})
    }else {
    
    var admin = await db.User.findOne({ where: { username: username }, include: { model: db.Staff }, })
    if (!admin) {
        res.status(200).send("user does not exist");
    }else {
        const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        res.status(403).json({ msg: "Your password is Wrong"})
    }
    else {
        jwt.sign({ admin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' }, (err, token) => {
            res.status(200).json({
                token: token,
                message: "login success",
               // admin: admin
            })
        })
    }
}}
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }


const user = {
    create: add,
    login: login,
    ensureAuth: authenticateToken
}

module.exports = user;