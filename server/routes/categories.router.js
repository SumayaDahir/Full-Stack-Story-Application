const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM categories WHERE id >= $1';
    pool.query(queryText, [3])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.error('Error in GET categories', err);
        res.sendStatus(500);
      });
  });

  

  router.post("/", (req, res) => {
    const queryText = `INSERT INTO categories (name)
    VALUES ($1) RETURNING * `; 
    pool.query(queryText, [req.body.name])
     .then((result) => {
       res.send(result.rows[0])
     })
     .catch((err) => {
       console.error("Error in post categories", err);
       res.sendStatus(500);
     });
 });
 
  module.exports = router