const router = require("express").Router();
const jwt = require("jsonwebtoken");
const users = [];
router.post("/", (req, res) => {
  if (req.body.token) {
    try {
      if (jwt.verify(req.body.token, "secret")) {
        res.status(200).json({ message: "Verifyed" });
      } else {
        res.status(401).json({ error: "No auth" });
      }
    } catch {
      res.status(403).json({ error: "Invalid token" });
    }
  } else {
    res.status(403).json({ error: "Forbidden !" });
  }
});
router.get("/users", (req, res) => res.status(200).json(users));
router.post("/register", (req, res) => {
  const { user_name, user_pass } = req.body;
  if (typeof user_name !== "undefined" || typeof user_pass !== "undefined") {
    console.log(user_name, user_pass);
    users.push({
      user_name: user_name,
      user_pass: user_pass,
    });
    res.status(201).json({ message: "User registered" });
  } else {
    res.status(400).json({ error: "user_name and user_pass required" });
  }
});
router.post("/login", (req, res) => {
  const { user_name, user_pass } = req.body;
  if (typeof user_name !== "undefined" || typeof user_pass !== "undefined") {
    const user = users.find((user) => user.user_name === user_name);
    if (user) {
      if (user.user_pass === user_pass) {
        res
          .status(200)
          .json({ message: `User logined: ${jwt.sign(user_name, "secret")}` });
      } else {
        res.status(403).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else {
    res.status(400).json({ error: "user_name and user_pass required" });
  }
});
module.exports = router;
