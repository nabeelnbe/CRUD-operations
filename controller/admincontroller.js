const adminSchema = require('../model/adminModel')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const userModel = require('../model/userModel')
const userschema = require('../model/userModel')
const { body, validationResult } = require('express-validator');


const loadLogin = async (req,res)=> {

    res.render('admin/login')
}

const logout = (req,res)=>{

    req.session.admin = null
    res.redirect('/admin/login')
}



const login = async (req,res)=> {
    try {
        
        const {username, password} =req.body
        
                const admin =    await adminSchema.findOne({username})
        
                if(!admin) return res.render('admin/login', {message: 'Admin doesnot exists'})
        
                const isMatch = await bcrypt.compare(password,admin.password)
        
                if (!isMatch) return res.render('admin/login', { message: 'Incorrect password' });
              
                req.session.admin = true
        
                res.render('admin/dashbord')


    } catch (error) {
        res.send(error)
    }
}


const loadDashbord = async (req,res) =>{
    try {

        const admin = req.session.admin
        
        if(!admin) return res.redirect('admin/login')

        const users = await userModel.find({});

        res.render('admin/dashbord',{users})
        
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send("Internal Server Error");
    }
}

const edituser = async (req,res) => {
    try {
        
        const {username,password,id} = req.body

        const hashedPassword = await bcrypt.hash(password,saltRounds)

        const user = await userschema.findOneAndUpdate(
            { _id: id },
            { $set: { username, password: hashedPassword, cpassword: hashedPassword } },
          );
          
        res.redirect('/admin/dashbord')

    } catch (error) {
        console.log(error)
    }
    
}

const deleteuser = async (req,res) => {
    try {

        const id = req.params.Id; // Extract manually
        
        
        const user = await userModel.findOneAndDelete({_id:id})

        res.redirect('/admin/dashbord')
        
    } catch (error) {
        console.log(error);
        
    }
    
}

const adduser = async (req,res) => {

    try {
        
        const {username,password,cpassword} = req.body

        const hashedPassword = await bcrypt.hash(password,saltRounds)

        const newUser = new userschema({
                username,
                password: hashedPassword,
                cpassword: hashedPassword
            });

        await newUser.save()

        res.redirect('/admin/dashbord')

    } catch (error) {
        console.log(error);
        
    }
    
}

const usersearch = async (req,res) => {

    try {

        const username = req.params.username;

        const user = await userModel.findOne({ username: username });

        if (user) {
            // Display user data on the screen
            res.send(`
                <h1>User Found</h1>
                <p>Username: ${userModel.username}</p>
            `);
        } else {
            res.status(404).send('<h1>User Not Found</h1>');
        }
        
    } catch (error) {
        console.log(error);
        
    }
    
}



module.exports = {
    loadLogin,
    login,
    loadDashbord,
    edituser,
    deleteuser,
    adduser,
    usersearch,
    logout
    
}