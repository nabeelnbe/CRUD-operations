const mongoose = require('mongoose')

const connectDB = async () => {

    try{
        const conn = await mongoose.connect('mongodb://mohamed_nabeel:<db_password>@ac-8kwodvq-shard-00-00.hytz1jh.mongodb.net:27017,ac-8kwodvq-shard-00-01.hytz1jh.mongodb.net:27017,ac-8kwodvq-shard-00-02.hytz1jh.mongodb.net:27017/?replicaSet=atlas-10demg-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0',{})
        console.log(`mongoDB connected: ${conn.connection.host}`)
    }catch(error){

        console.log(error)
        process.exit(1)
    }
    
}

module.exports = connectDB

