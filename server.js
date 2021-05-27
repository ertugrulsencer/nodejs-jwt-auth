require("dotenv").config();
const express = require("express");
const app = require("express")();
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./middlewares/auth");

const posts = [
  { user: "ertugrulsencer", header: "Example post 1" },
  { user: "ertugrul2", header: "Example post 2" },
  { user: "ertugrulsencer", header: "Example post 3" },
  { user: "ertugrul2", header: "Example post 4" },
];

const users = [
  { username: "ertugrulsencer", password: "bnkjBıubIUvbHUYv3uhyV" },
  { username: "ertugrul2", password: "nbkjbHIJbggıhBIhbvVIH" },
];

app.use(express.json({ extended: false }));

app.get("/posts", authenticateToken, (req, res) => {
  if (!req.user) return res.send("Login Page !");
  const user_posts = posts.filter((post) => post.user == req.user.username);
  res.status(200).json({ posts: user_posts });
});

app.post("/auth/login", (req, res) => {
  const { user_name, user_pass } = req.body;
  const user = users.find(
    (user) => user.username == user_name && user.password == user_pass
  );
  if (!user)
    return res.status(400).json({ error: "Username or password faild" });
  res.status(200).json({
    message: "Login succes",
    accessToken: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 30, // Number or String value
    }),
  });
});

app.listen(5000, () => console.log("Server running"));
