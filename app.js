const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const cors = require("cors");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
app.use(cookieParser());

//const corsOptions = {
//  origin: ["https://law-firm-admin-omega.vercel.app", "https://law-client-taupe.vercel.app"],
//  methods: [GET,POST,PUT,DELETE],
//  credentials: true,
//};

//app.use(cors(corsOptions));

const corsOptions = {
  origin: 'https://law-firm-admin-omega.vercel.app',
  credentials: true
};

app.use(cors(corsOptions));

const FAQ = require("./routes/FAQRoute");
const Case = require("./routes/CaseRouter");
const Comment = require("./routes/ClientCommentRouter");
const PracticeArea = require("./routes/PracticeAreaRouter");
const Advocate = require("./routes/AdvocateRouter");
const Contact = require("./routes/ContactRouter");
const Admin = require("./routes/AdminRouter");

app.use("/api/admin", Admin);
app.use("/api/faq", FAQ);
app.use("/api/case", Case);
app.use("/api/comment", Comment);
app.use("/api/practice", PracticeArea);
app.use("/api/advocate", Advocate);
app.use("/api/contact", Contact);

module.exports = app;
