const express = require("express");
const app = express();
const cors = require("cors");
const { db } = require("./config/db");
const { bookRoutes } = require("./routes/bookRoutes");
const { countryRoutes } = require("./routes/countryRoutes");
const { writerRoutes } = require("./routes/writerRoutes");

require("dotenv").config();

const fileUpload = require("express-fileupload");

app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cors());
app.use(express.static("imgs"));

db.connect();

app.use(express.json());

// app.use("/todos/api", todoRoutes);
app.use("/book/api", bookRoutes);
app.use("/country/api", countryRoutes);
app.use("/writer/api", writerRoutes);

app.listen(8000, () => {
  console.log("listening port 8000");
});
