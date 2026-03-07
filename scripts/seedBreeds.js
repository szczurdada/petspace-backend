const mongoose = require("mongoose");
const Breed = require("../models/Breed");

async function seed() {
  try {
    await mongoose.connect(
      "mongodb+srv://kinada:Kinada11@petspace.k5fe73w.mongodb.net/?appName=petspace",
    );
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();
    const breeds = Object.keys(data.message);
    await Breed.insertMany(
      breeds.map((name) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
      })),
    );
    process.exit();
  } catch (e) {
    console.log(e);
  }
}

seed();
