const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dvdrental',
    port: 5432,
    password: 'anyu'
})

module.exports = pool