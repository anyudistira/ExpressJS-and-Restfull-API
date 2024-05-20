const express = require('express')
const pool = require('./config.js')
const router = express.Router()

//Menampilkan data seluruh list film
router.get('/film', (req, res) =>{
    const query = `SELECT * FROM film ORDER BY film_id ASC`
    pool.query(query, (err, result) => {
        if(err) throw(err)
        res.status(200).json(result.rows)
    })
})

// Menampilkan data film tertentu berdasarkan id
router.get('/film/:id', (req, res) =>{
    const {id} = req.params
    const query = `SELECT * FROM film WHERE film_id = $1`
    pool.query(query, [id], (err, result) => {
        if(err) throw(err)
        res.status(200).json(result.rows)
    })
})

//Menampilkan data list category
router.get('/category', (req, res) =>{
    const query = `SELECT * FROM category ORDER BY category_id ASC`
    pool.query(query, (err, result) => {
        if(err) throw(err)
        res.status(200).json(result.rows)
    })
})

//Menampilkan data list film berdasarkan category
router.get('/category/:name', (req, res) =>{
    const {name} = req.params
    const query = `SELECT c.name as category, f.* FROM film f JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON c.category_id = fc.category_id WHERE c.name = $1`
    pool.query(query, [name], (err, result) => {
        if(err) throw(err)
        res.status(200).json(result.rows)
    })
})

module.exports = router