const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./authRouter");
const PORT = process.env.PORT || 3005;
const app = express();
const breedsRouter = require("./breedsRouter");
const countriesRouter = require("./countriesRouter");

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use("/breeds", breedsRouter);
app.use("/countries", countriesRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
