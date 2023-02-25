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


module.exports = router;
