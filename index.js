import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {posts: posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});


app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.post("/create", (req, res) => {
  const post = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content
  };
  posts.push(post);
  res.redirect("/")
});

app.get("/post/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("post", {post: post});
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });