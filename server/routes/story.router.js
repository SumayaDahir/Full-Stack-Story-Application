const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

router.get("/", (req, res) => {
  const queryText = `SELECT stories.*, users.username
                       FROM stories
                       JOIN users ON stories.user_id = users.id`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error in GET all stories", err);
      res.sendStatus(500);
    });
});


router.post("/", (req, res) => {
  console.log(req.body);
  const queryText = `INSERT INTO stories (user_id, title, body) 
    VALUES ($1, $2, $3) RETURNING *`;

  pool
    .query(queryText, [req.body.user_id, req.body.title, req.body.body])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error in post stories", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
    const storyId = req.params.id;
    console.log(storyId)
  
    const deleteCommentsQuery = `DELETE FROM comments WHERE story_id = $1`;
    pool.query(deleteCommentsQuery, [storyId])
      .then(() => {
        const deleteStoryQuery = `DELETE FROM stories WHERE id = $1`;
        return pool.query(deleteStoryQuery, [storyId]);
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error('Error', err);
        res.sendStatus(500);
      });
  });
  
  
  router.put('/:id', (req, res) => {
    const storyId = req.params.id;
    const { title, body } = req.body;
    const queryText = `UPDATE stories SET title = $1, body = $2 WHERE id = $3`;
  
    pool.query(queryText, [title, body, storyId])
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error('Error', err);
        res.sendStatus(500);
      });
  });
  

  


module.exports = router;
