const userschema = require('../model/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { body, validationResult } = require('express-validator');


const registerUser = async (req,res)=>{

    try{
        const {username, password,cpassword} =req.body

        const user =    await userschema.findOne({username})

        if(user) return res.render('user/register', {message: 'user already exists'})
        
        const hashedPassword = await bcrypt.hash(password, saltRounds );

        const newUser = new userschema({
            username,
            password: hashedPassword,
            cpassword: hashedPassword
        });
    
        await newUser.save()

        res.render('user/login',{message: 'user created successfully'})

    }catch(error){
        console.error('Error during registration:', error);
        res.render('user/register', { message: 'Something went wrong: ' + error.message });
    }

}


const login = async (req,res)=>{

    try{
        const {username, password} =req.body

        const user =    await userschema.findOne({username})

        if(!user) return res.render('user/login', {message: 'user doesnot exists'})

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) return res.render('user/login', { message: 'Incorrect password' });
      
        req.session.user = true

        res.render('user/userhome',{message: 'login successfully'})

    }catch(error){
        console.error(error);
        res.render('user/login',{message: 'something went wrong'})
    }

}

const loadRegister = (req,res) =>{
    res.render('user/register')
}

const loadLogin = (req,res) =>{
    res.render('user/login')
}

const loadHome = (req,res) =>{
    res.render('user/userhome')
}

const logout = (req,res)=>{

    req.session.user = null
    res.redirect('/user/login')
}


module.exports = {

    registerUser,
    loadLogin,
    loadRegister,
    login,
    loadHome,
    logout

}