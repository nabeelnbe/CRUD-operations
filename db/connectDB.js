const mongoose = require('mongoose')

const connectDB = async () => {

    try{
        const conn = await mongoose.connect('mongodb+srv://atlas-sample-dataset-load-680072fa59f31e20b0df48f3:<db_password>@cluster0.hytz1jh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{})
        console.log(`mongoDB connected: ${conn.connection.host}`)
    }catch(error){

        console.log(error)
        process.exit(1)
    }
    
}

module.exports = connectDB

