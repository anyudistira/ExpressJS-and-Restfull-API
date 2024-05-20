const pool = require ('./config')
const express = require('express')
const router = express.Router()

router.get('/actor', (req, res) => {
    
    const query = 'SELECT * FROM film',

    pool.query(query, (err, result) => {
        if(err) throw err;

        res.status(200).json(result)
    })
})

SELECT * FROM film;
SELECT * FROM film WHERE film_id=7;
SELECT * FROM category;
SELECT f.film_id, f.title, c.name AS category_name
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id;

module.exports = router