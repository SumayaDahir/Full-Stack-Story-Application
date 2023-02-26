const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");


router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "stories"                                   
`;

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

router.put('/:id' , (req, res) => {
  const storyId = req.params.id;
  const { likes } = req.body;
  console.log(req.params)
  const queryText = `UPDATE stories SET likes = $1 WHERE id = $2;`;
  pool.query(queryText, [likes, storyId])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('Error updating likes:', error);
    res.sendStatus(500);
  });
});


module.exports = router;
