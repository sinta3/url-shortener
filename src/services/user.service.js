const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const UserModel = require('@models/user.model');

async function registerUser(req, res){
    try {
        const { email, password, fullname} = req.body;

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!validEmail.test(email)) {
            const error = new Error('Invalid email');
            error.status = 400;
            throw error;
        }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            const error = new Error('Mail exist');
            error.status = 400;
            throw error;
        }

        const hash = await bcrypt.hash(password, 10)
        const userData = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            fullname,
            email,
            password: hash,
            createdAt: new Date()
        });
          
        const saveUser = await UserModel.create(userData)
        if (saveUser) {
            const jsonRes = {
                message: 'Registration success'
            }
            return jsonRes;
        } else {
            const error = new Error('Registration failed');
            error.status = 400;
            throw error;
        }
    } catch (err) {
      throw err;
    }
}

async function loginUser(req,res){
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        if (!user) {
            const error = new Error('Email not found');
            error.status = 400;
            throw error;
        }

          const isMatch = await bcrypt.compare(password, user.password);
        
          if (!isMatch) {
            const error = new Error(`Auth failed: password not match`);
            error.status = 400;
            throw error;
          }
          const dataUser = {
            userId: user._id,
            fullname: user.fullname,
            email: user.email
        }
        const token = jwt.sign(dataUser, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT_DURATION
        })

        return {
            message: 'Auth successful',
            data: { 
                token
            }
        }
    } catch (err) {
      throw err;
    }
}

module.exports = {
    registerUser,
    loginUser
}