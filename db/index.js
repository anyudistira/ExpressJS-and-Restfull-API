const fs = require ('fs');
const pool = require ('../config')

const seedQuery = fs.readFileSync("./seeding.sql", "utf8");
pool.query(seedQuery, (err, result) =>{
    if(err) throw err;
    console.log('seeding success')
    pool.end()

    
})

