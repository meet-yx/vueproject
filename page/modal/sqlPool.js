/**
 * Created by zx on 2017/10/23.
 */
"use strict";
const mysql = require("promise-mysql");

var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"yx411",
    port:3306,
    database:"babydream",
    connectionLimit: 10
});
module.exports= pool;


