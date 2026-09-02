const Router = require("express");
const router = new Router();
const Country = require("../../models/Country");
const { reportError } = require("../../utils/errors");

router.get("/", async (req, res) => {
  try {
    const countries = await Country.find({}, "country").sort({ country: 1 });
    res.json(countries.map((c) => c.country));
  } catch (err) {
    reportError(err, res);
  }
});

router.get("/cities", async (req, res) => {
  try {
    const found = await Country.findOne({ country: req.query.country });
    const cities = found ? [...found.cities].sort() : [];
    res.json(cities);
  } catch (err) {
    reportError(err, res);
  }
});

module.exports = router;
