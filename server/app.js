const express = require("express");
const { connectToDatabase } = require("./db/connect");
const authRoute = require("./routes/authRoute");
const taskRoute = require('./routes/taskRoute')
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

//sign up route
app.use("/api", authRoute,taskRoute);
app.get("/", (req, res) => {
  res.send({ message: "Hi all!" });
});

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    // Start your Express server or perform other setup tasks here
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error starting the application:", error);
  });
