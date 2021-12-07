const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
const app = express();
//Middleware
app.use(bodyParser.json());
app.use(express.static("static"));
app.use(cors(corsOptions));
app.use(fileUpload({}));

//Import Routes
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const answersRoute = require("./routes/answers");
const commentsRoute = require("./routes/comments");
const tagsRoute = require("./routes/tags");

// const {static} = require("express");

app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/answers", answersRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/tags", tagsRoute);

mongoose.connect(process.env.DATABASE, function (err) {
  if (err) return console.log(err);
  app.listen(process.env.PORT, () => {
    console.log("Сервер ожидает подключения...");
    console.log(process.env.PORT);
  });
});
