const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// router.get("/", rejectUnauthenticated, (req, res) => {
//   const queryText = "SELECT * FROM users";
//   pool
//     .query(queryText)
//     .then(() => {
//       res.send(req.user);
//     })
//     .catch((err) => {
//       console.error("Error in GET users", err);
//       res.sendStatus(500);
//     });
// });

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, email, password) 
    VALUES ($1, $2, $3) RETURNING *`;
  pool
    .query(queryText, [username, email, password])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// router.delete("/:id", (req, res) => {
//   const userId = req.params.id;
//   const queryText = "DELETE FROM users WHERE id=$1";

//   pool
//     .query(queryText, [userId])
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch((err) => {
//       console.error("Error", err);
//       res.sendStatus(500);
//     });
// });

// router.put("/:id", (req, res) => {
//   const userId = req.params.id;
//   const { username, password } = req.body;
//   console.log(req.body);
//   const queryText = `UPDATE users SET username = $1, password = $2, WHERE id = $3`;

//   pool
//     .query(queryText, [username, password, userId])
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch((err) => {
//       console.error("Error", err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;


