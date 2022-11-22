const express = require("express");
var multer = require('multer')
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
var compression = require('compression')
var bodyParser = require('body-parser')
var Stock = require('./models/Stock')
var csv = require('csvtojson')

const route = require("./routes/");
const connectDB = require("./db.js");
const docs = require('./docs');

dotenv.config();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

var uploads = multer({ storage: storage })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
app.use(compression(6))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));


connectDB(process.env.MONGO_URL || "mongodb://localhost:27017/projectDB");
const PORT = process.env.PORT || 3000;

route(app);

app.post('/uploadStockCSV', uploads.single('csvFile'), (req, res) => {

  csv()
    .fromFile(req?.file?.path)
    .then((response) => {
      response.forEach(async (item) => {
        if (item.symbol && item.date) {
          const newStock = new Stock({
            symbol: item?.symbol,
            open: Number(item?.open || 0),
            close: Number(item?.close || 0),
            high: Number(item?.high || 0),
            low: Number(item?.low || 0),
            volume: Number(item?.volume || 0),
            date: new Date(item?.date),
          });
          try {
              await newStock.save()
          } catch (error) {
              console.log(error);
          }}
        }, (err) => {  return res.status(400).json({ status: 0, message: err }); })
        return res.status(200).json({ status: 1, message: "inserted" });
    })
})

app.listen(PORT, function () {
  console.log(`Server is starting on port: ${PORT}`);
});
