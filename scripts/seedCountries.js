const mongoose = require("mongoose");
const Country = require("../models/Country");

async function seed() {
  try {
    await mongoose.connect(
      "mongodb+srv://kinada:Kinada11@petspace.k5fe73w.mongodb.net/?appName=petspace",
    );

    const res = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await res.json();

    const countries = data.data.map((item) => ({
      country: item.country,
      cities: item.cities,
    }));

    await Country.deleteMany();
    await Country.insertMany(countries);
    console.log("Done!");
    process.exit();
  } catch (e) {
    console.log(e);
  }
}

seed();