const mongoose = require("mongoose");

const connectionString = "mongodb+srv://vblanchard:Ll1esEtj6jaQHuPH@myfirstdatabase.2fmid.mongodb.net/weatherapp";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
//
