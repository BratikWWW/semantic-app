const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const marklogic = require("marklogic");
const my = require("./my-connection.js");

const db = marklogic.createDatabaseClient(my.connInfo);

const app = express();

app.set("view engine", "ejs");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, "views", `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
app.use(express.static("styles"));

const query = [
  "SELECT ?o ?s",
  "WHERE {",
  "    ?o <http://example.org/marklogic/predicate/has> ?s;",
  "    }",
];

app.get("/", (req, res) => {
  db.graphs.sparql("application/sparql-results+json", query.join("\n")).result(
    function (result) {
      const directions = result.results.bindings;
      res.render(createPath("index"), { directions });
    },
    function (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  );
});

app.post("/select-direction", jsonParser, (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.use((req, res) => {
  res.status(404).send("<h1>Not found</h1>");
});
