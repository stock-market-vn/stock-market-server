const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
var compression = require('compression')

const route = require("./routes/");
const connectDB = require("./db.js");
const docs = require('./docs');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
app.use(compression(6))

connectDB(process.env.MONGO_URL || "mongodb://localhost:27017/projectDB");
const PORT = process.env.PORT || 3000;

route(app);

app.listen(PORT, function () {
  console.log(`Server is starting on port: ${PORT}`);
});
