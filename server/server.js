const path = require("path");
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

var DIST_DIR = path.join(__dirname, '../client/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
const fileName = "views/index.ejs";

const mongoString =
  "mongodb+srv://username:password@cluster0.ehsk9.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(mongoString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-trek");
    const captainCollection = db.collection("captain");
    app.get("/", (req, res) => {
      // captainCollection.find().toArray().then(captains => {
      //   res.render('index.ejs', { captains: captains });
      // }).catch(error => {
      //     console.error(error);
      // })
      res.sendFile(HTML_FILE);
    });

    app.post("/createCaptain", (req, res) => {
      console.log(req.body);
      captainCollection
        .insertOne(req.body)
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      res.redirect("/");
    });

    app.listen(3001, (req, res) => {
      console.log("Hello, World!");
    });
  })
  .catch((error) => console.error(error));
