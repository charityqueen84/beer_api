const mongoose = require("mongoose"); //re-accesses mongoose
const Schema = mongoose.Schema; // access to schema builder

const BeerSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  rating: {
    type: Number,
    min: [0, "Rating must be a number greater than or equal to 0"], //can set min and max for numbers
    max: [10, "Rating cannot be greater than 10"],
    required: true
  }
});

const model = mongoose.model("Beer", BeerSchema); //if someone tries to export this, they'll get that model. Structure of our data, we named it Beer.
module.exports = model;
