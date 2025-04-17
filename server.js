const express=require("express")
const app = express()
const path = require('path')
const userRouters = require('./router/user')
const adminRouters = require('./router/admin')
const connectDB = require("./db/connectDB")
const session = require('express-session')
const nocache = require('nocache')

app.use(nocache())
app.use(session({secret:'skey',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24
    }

}))

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'hbs')
app.use(express.static('public'))



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/user',userRouters)
app.use('/admin',adminRouters)


connectDB()


app.listen(3050,()=>{
    console.log("..........")
    console.log("Server started....")

})
