const Router = require("express");
const router = new Router();
const Country = require("./models/Country");

router.get("/", async (req, res) => {
  const countries = await Country.find({}, "country");
  res.json(countries.map((c) => c.country));
});

router.get("/cities", async (req, res) => {
  const { country } = req.query;
  const found = await Country.findOne({ country });
  res.json(found ? found.cities : []);
});

module.exports = router;
