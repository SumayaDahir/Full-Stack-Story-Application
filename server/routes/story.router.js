const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "stories" WHERE user_id = $1                                    
`;

  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error in GET all stories", err);
      res.sendStatus(500);
    });
});


router.post("/", (req, res) => {
  console.log("in post ROUTE", req.body);
  const userId = req.user.id; 

  const queryText = `INSERT INTO stories (user_id, profile_picture, title, body, category_id, likes, loves, claps) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

  pool
    .query(queryText, [userId, req.body.profile_picture, req.body.title, req.body.body, req.body.category_id, req.body.likes, req.body.loves, req.body.claps])
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
    const { body } = req.body;
    console.log(req.body)
    const queryText = `UPDATE stories SET body = $1 WHERE id = $2`;
  
    pool.query(queryText, [body, storyId])
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error('Error', err);
        res.sendStatus(500);
      });
  });
  

  


module.exports = router;
