const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const corsOptions = {
  // origin: "https://intelligent-forum.herokuapp.com",
  origin: process.env.ORIGIN,
  // origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
const app = express();
//Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname));
// app.use(express.static(path.resolve(__dirname, "static")));
app.use(cors(corsOptions));
app.use(fileUpload({}));

//Import Routes
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const answersRoute = require("./routes/answers");
const commentsRoute = require("./routes/comments");
const tagsRoute = require("./routes/tags");
const userTagsRoute = require("./routes/userTags");
const MessagesRoute = require("./routes/messages");

app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/answers", answersRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/tags", tagsRoute);
app.use("/api/userTags", userTagsRoute);
app.use("/api/messages", MessagesRoute);

app.get("/", (req, res) => {
  res.status(200).send("Hello server is running").end();
});

mongoose.connect(process.env.DATABASE, function (err) {
  if (err) return console.log(err);
  app.listen(process.env.PORT || 5000, () => {
    console.log("Сервер ожидает подключения...");
  });
});
