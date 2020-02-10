const express = require("express");
const beerRouter = express.Router();
const Beer = require("../models/beer");

beerRouter.get("/", (req, res) => {
  //did find and replace --> app to beerRouter
  //get request to get all documents
  Beer.find((err, beers) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(beers);
    }
  });
});

beerRouter.get("/:beer_id", () => {
  //adding a variable we want to capture.  : denotes a variable. This is a get request for one beer
  Beer.findById(req.params.beer_id, (err, beer) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(beer);
    }
  });
});

beerRouter.put("/:beer_id", (req, res) => {
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

beerRouter.delete("/:beer_id", (req, res) => {
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
beerRouter.post("/", function(req, res) {
  console.log("POST RECEIVED");
  let beer = new Beer();
  beer.name = req.body.name; //grabbing beer model and constructing with pieces we need- we get from request object
  beer.rating = req.body.rating;
  console.log("just before save...");
  beer.save((err, beer) => {
    if (err) {
      console.log("no error either...");
      res.status(500); //status code - make sure you're using beerRouterropriate number
      res.send(err);
    } else {
      console.log("never see this i bet");
      res.send(`Saved your ${beer}`);
    }
  });
});

module.exports = beerRouter;
