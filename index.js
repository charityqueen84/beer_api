const express = require("express"); //go into node modules folder find express and export whatever it gives us.
const mongoose = require("mongoose");
const Beer = require("./models/beer");

const app = express(); //store results of express method in what we're calling app.

app.use(express.urlencoded({ extended: true })); //allows nested object

app.get("/hello", function(req, res) {
  //changes from use to get - better practice
  //use is a function - middleware - write code that runs in between when a request is received and sent out. App.use is how you'd write your own
  console.log("Got a request!");
  res.send("<h1>Hi Hello Good Day!!!<h/h1>"); //when you go to the localhost, it prints got a request to console.
});

app.get("/beers", (req, res) => {
  //get request to get all documents
  Beer.find((err, beers) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(beers);
    }
  });
});

app.get("/beers/:beer_id", () => {
  //adding a variable we want to capture.  : denotes a variable. This is a get request for one beer
  Beer.findById(req.params.beer_id, (err, beer) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(beer);
    }
  });
});

app.put("/beers/:beer_id", (req, res) => {
  Beer.findById(req.params.beer_id, (err, beer) => {
    if (err) {
      res.status(500).send(err);
    } else {
      beer.name = req.body.name;
      beer.rating = req.body.rating;

      beer.save((err, beer) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(`Beer posted! \n ${beer}`);
        }
      });
    }
  });
});

app.delete("/beers/:beer_id", (req, res) => {
  Beer.deleteOne(
    {
      _id: req.params.beer_id
    },
    err => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(`Successfully deleted beer with id: ${re.params.beer_id}`);
      }
    }
  );
});
app.post("/beers", function(req, res) {
  console.log("POST RECEIVED");
  let beer = new Beer();
  beer.name = req.body.name; //grabbing beer model and constructing with pieces we need- we get from request object
  beer.rating = req.body.rating;
  console.log("just before save...");
  beer.save((err, beer) => {
    if (err) {
      console.log("no error either...");
      res.status(500); //status code - make sure you're using appropriate number
      res.send(err);
    } else {
      console.log("never see this i bet");
      res.send(`Saved your ${beer}`);
    }
  });
});

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
