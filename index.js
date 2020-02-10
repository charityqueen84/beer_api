const express = require("express"); //go into node modules folder find express and export whatever it gives us.
const mongoose = require("mongoose");
const Beer = require("./models/beer");
const beerRouter = require("./routes/beerRouter");

const app = express(); //store results of express method in what we're calling app.

app.use(express.urlencoded({ extended: true })); //allows nested object

app.use("/api/v1/beers", beerRouter);

const db = mongoose.connect(
  "mongodb+srv://charityqueen84:Batman19@cluster0-l43at.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "beers" }
);

mongoose.connection.on("connected", function() {
  console.log("Connected to beers database");
  app.listen(4444, function() {
    //makes sure it's a connection first before it connects.
    //just choose a port (randomly chose 4444)
    console.log("Listening on port 4444...");
  });
});
mongoose.connection.on("error", function() {
  console.log("Error connecting to beers database :(");
  process.exit(1);
});

console.log("See this once on startup");
