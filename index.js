require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

//Database Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("Database is connected successfully!!!");
  })
  .catch((error) => {
    console.log("Database connection is failed!!!");
  });

app.get("/", (req, res) => {
  return "Hello world";
});

// Create Sever
app.listen(process.env.PORT, () => {
  console.log(`Server is successfully running on port ${process.env.PORT}`);
});
