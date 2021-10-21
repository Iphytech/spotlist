// import mongoose from 'mongoose'
const mongoose = require('mongoose');

const DBConnection = async () => {
    try {
        mongoose.connect(`${process.env.DBSERVER}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        mongoose.connection.once('open', async function () {

            console.log('Database connection was successful')
        })
    } catch (error) {
        console.error(error)
    }

}

export { DBConnection };