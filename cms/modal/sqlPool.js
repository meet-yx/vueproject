/**
 * Created by zx on 2017/10/23.
 */
"use strict";
const mysql = require("promise-mysql");

var pool = mysql.createPool({
    host:"172.16.10.66",
    user:"root",
    password:"root",
    port:3306,
    database:"babydream",
    connectionLimit: 10
});
module.exports= pool;


