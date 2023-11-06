const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('upload'))

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));

const FAQ = require("./routes/FAQRoute");
const Case = require("./routes/CaseRouter");
const Comment = require("./routes/ClientCommentRouter");
const PracticeArea = require("./routes/PracticeAreaRouter")
const Advocate = require("./routes/AdvocateRouter")
const Contact = require("./routes/ContactRouter")

app.get("/test", (req,res)=>{
  res.status.json({
    message:"Testing On Vercel"
  })
})

app.use("/api/faq", FAQ);
app.use("/api/case", Case);
app.use("/api/comment", Comment);
app.use("/api/practice", PracticeArea);
app.use("/api/advocate", Advocate)
app.use("/api/contact", Contact)


module.exports = app;
