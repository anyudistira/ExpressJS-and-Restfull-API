const pool = require('./config')
const express = require('express')
const router = express.Router()
const migrate = require('node-pg-migrate').default;


//Menampilkan data list seluruh film
router.get('/film', (req, res) => {
    let query = 'SELECT * FROM film'
    pool.query(query, (err, result) => {
        if (err) throw err;
        res.status(200).json(result)
    })
})

// Menampilkan data film tertentu berdasarkan id

router.get('/film/:id', (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM film WHERE film_id = $1`
    pool.query(query, [id], (err, result) => {
        if (err) throw (err)
        res.status(200).json(result.rows)
    })
})

// Menampilkan data list film berrdasarkan category

router.get('/category/:name', (req, res) => {
    const { name } = req.params
    const query = `SELECT c.name as category, f.* FROM film f JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON c.category_id = fc.category_id WHERE c.name = $1`
    pool.query(query, [name], (err, result) => {
        if (err) throw (err)
        res.status(200).json(result.rows)
    })


})
// Menambahkan kolom age pada actor
router.get('/migrate', async (req, res) => {
    try {
      const migrationResult = await migrate({
        databaseUrl: 'postgresql://postgres:anyu@localhost:5432/dvdrental', // Update with the correct connection string
        dir: 'migrations',
        direction: 'up',
        migrationsTable: 'migrations',
      });
  
      console.log('Migration result:', migrationResult);
      res.status(200).json({ message: 'Migration completed successfully' });
    } catch (err) {
      console.error('Migration error:', err);
      res.status(500).json({ error: 'Migration failed' });
    }
  });


// SELECT * FROM film;
// SELECT * FROM film WHERE film_id=7;
// SELECT * FROM category;
// SELECT f.film_id, f.title, c.name AS category_name
// FROM film f
// JOIN film_category fc ON f.film_id = fc.film_id
// JOIN category c ON fc.category_id = c.category_id;

module.exports = router