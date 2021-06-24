import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const connect = mysql.createPool({
    connectionLimit: 1000,
    host: process.env.HOST,
    user: process.env.USER_ID,
    database: process.env.DATEBASE,
    password: process.env.PASSWORD
});

const selectDatabase = `USE ${process.env.DATEBASE}`;

connect.query(selectDatabase, (err, res) => {

    if(err){
        console.log(err);
    }
    else{
        console.log('Datebase selected |users|');
    }
    
});

export default function connectDatebase(){
    
    return connect;
}