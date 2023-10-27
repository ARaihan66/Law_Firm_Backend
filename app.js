const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));

const FAQ = require("./routes/FAQRoute");
const Case = require("./routes/CaseRouter");
const Comment = require("./routes/ClientCommentRouter");

app.use("/api/faq", FAQ);
app.use("/api/case", Case);
app.use("/api/comment", Comment);

module.exports = app;
