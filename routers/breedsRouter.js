const Router = require("express");
const router = new Router();
const Breed = require("../models/Breed");

router.get("/", async (req, res) => {
  const breeds = await Breed.find({}, "name");
  res.json(breeds.map((b) => b.name));
});

module.exports = router;
