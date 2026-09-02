const Router = require("express");
const router = new Router();
const Breed = require("../../models/Breed");
const { reportError } = require("../../utils/errors");

router.get("/", async (req, res) => {
  try {
    const breeds = await Breed.find({}, "name").sort({ name: 1 });
    res.json(breeds.map((b) => b.name));
  } catch (err) {
    reportError(err, res);
  }
});

module.exports = router;
