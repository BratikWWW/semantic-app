const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const marklogic = require("marklogic");
const my = require("./my-connection.js");
const cors = require("cors");

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

app.use(
  cors({
    origin: "*",
  })
);

const queryDirection = `
  SELECT DISTINCT ?o 
  WHERE {
     ?o <http://example.org/marklogic/predicate/has> ?s;
      }
`;

const querySpec = (direction) => {
  return `
  PREFIX o: <http://example.org/marklogic/направления/${direction}>
  PREFIX p: <http://example.org/marklogic/predicate/has>
  SELECT    ?s
  WHERE {
    o: p: ?s
  }
`;
};

const queryFGOS = (spec) => {
  return `
    select * where {
      <http://example.org/marklogic/специальность/${spec}> ?p ?o
    }order by asc(?p)
`;
};

async function querySparql(query, arg = 0) {
  const response = await db.graphs.sparql(
    "application/sparql-results+json",
    query
  );
  const data = await response.result();
  return data;
}

app.get("/main", (req, res) => {
  querySparql(queryDirection).then((result) => {
    const directions = result.results.bindings;
    res.json(directions);
  });
});

app.post("/select-direction", jsonParser, (req, res) => {
  querySparql(querySpec(req.body.direction)).then((result) => {
    const spec = result.results.bindings;
    //res.render(createPath("spec"), { spec });
    res.json(spec);
  });
});

app.post("/view-fgos", jsonParser, (req, res) => {
  console.log(req.body);
  querySparql(queryFGOS(req.body.spec)).then((result) => {
    const fgos = result.results.bindings;
    res.json(fgos);
  });
});

app.use((req, res) => {
  res.status(404).send("<h1>Not found</h1>");
});

// const profst = [
//   { "profst":
//   {
//     "1": {
//       "code":"06.001",
//       "descr": "Профессиональный стандарт 'Программист', утвержденный приказом Министерства труда и социальной защиты Российской Федерации от 18 ноября 2013 г. N 679н (зарегистрирован Министерством юстиции Российской Федерации 18 декабря 2013 г., регистрационный N 30635), с изменением, внесенным приказом Министерства труда и социальной защиты Российской Федерации от 12 декабря 2016 г. N 727н (зарегистрирован Министерством юстиции Российской Федерации 13 января 2017 г., регистрационный N 45230) "
//     },
//     "2": {
//       "code":"06.004",
//       "descr": "Профессиональный стандарт 'Специалист по тестированию в области информационных технологий', утвержденный приказом Министерства труда и социальной защиты Российской Федерации от 11 апреля 2014 г. N 225н (зарегистрирован Министерством юстиции Российской Федерации 9 июня 2014 г., регистрационный N 32623), с изменением, внесенным приказом Министерства труда и социальной защиты Российской Федерации от 12 декабря 2016 г. N 727н (зарегистрирован Министерством юстиции Российской Федерации 13 января 2017 г., регистрационный N 45230) "
//     },
//     "3": {
//       "code":"06.022",
//       "descr": "Профессиональный стандарт 'Системный аналитик', утвержденный приказом Министерства труда и социальной защиты Российской Федерации от 28 октября 2014 г. N 809н (зарегистрирован Министерством юстиции Российской Федерации 24 ноября 2014 г., регистрационный N 34882), с Приказ Министерства образования и науки РФ от 19 сентября 2017 г. N 920 'Об утверждении федерального… Редакция с изменениями N 1456 от 26.11.2020 15.06.2021 Система ГАРАНТ 12/12 изменением, внесенным приказом Министерства труда и социальной защиты Российской Федерации от 12 декабря 2016 г. N 727н (зарегистрирован Министерством юстиции Российской Федерации 13 января 2017 г., регистрационный N 45230)"
//     },
//     "4": {
//       "code":"06.028",
//       "descr": "Профессиональный стандарт 'Системный программист', утвержденный приказом Министерства труда и социальной защиты Российской Федерации от 5 октября 2015 г. N 685н (зарегистрирован Министерством юстиции Российской Федерации 20 октября 2015 г., регистрационный N 39374)"
//     }
//   }
// }
// ];
// const structure = [
//   {"structure":{
//   "Дисциплины (модули)": "не менее 160",
//   "Практика":"не менее 20",
//   "Государственная итоговая аттестация": "не менее 9",
//   "Объем программы бакалавриата": "240"
//   }
// }];
