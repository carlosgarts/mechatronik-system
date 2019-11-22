import mysql from 'mysql';
import {promisify} from 'util';
import db from './keys'

const pool = mysql.createPool(db.database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            Cconsole.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

//Promisify Pool Query
pool.query = promisify(pool.query);

export default pool;