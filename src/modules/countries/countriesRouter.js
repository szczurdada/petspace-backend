const Router = require("express");
const router = new Router();
const Country = require("../../models/Country");
const { errorResponse } = require("../../utils/errors");

router.get("/", async (req, res) => {
  try {
    const countries = await Country.find({}, "country").sort({ country: 1 });
    res.json(countries.map((c) => c.country));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
});

router.get("/cities", async (req, res) => {
  try {
    const found = await Country.findOne({ country: req.query.country });
    const cities = found ? [...found.cities].sort() : [];
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR"));
  }
});

module.exports = router;
