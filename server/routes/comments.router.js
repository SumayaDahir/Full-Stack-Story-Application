const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const userStrategy = require("../strategies/user.strategy");

router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT comments.id, comments.user_id, comments.story_id, comments.body, "user".username, "user".profile_picture
  FROM comments 
  JOIN "user" ON comments.user_id = "user".id
  WHERE comments.user_id = $1;
  `;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error in GET comments", err);
      res.sendStatus(500);
    });
});


router.post("/", (req, res) => {
    console.log(req.body);
    const userId = req.user.id;
console.log("in comments userid" , userId)
    const queryText = `INSERT INTO comments (user_id, story_id, body) 
      VALUES ($1, $2, $3) RETURNING *`;
  
    pool
      .query(queryText, [userId, req.body.story_id, req.body.body])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.error("Error in post comments", err);
        res.sendStatus(500);
      });
  });


  router.delete('/:id', (req, res) => {
    const commentsId = req.params.id;
    const queryText = `DELETE FROM comments WHERE id = $1`;

    pool.query(queryText, [commentsId])

    .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error('Error', err);
        res.sendStatus(500);
      });
  });


  router.put('/:id', (req, res) => {
    const commentsId = req.params.id;
    console.log(commentsId)
    const { body } = req.body;
    const queryText = `UPDATE comments SET body = $1 WHERE id = $2`;
  
    pool.query(queryText, [body, commentsId])
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error('Error', err);
        res.sendStatus(500);
      });
  });

  
module.exports = router;