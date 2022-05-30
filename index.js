// const marklogic = require("marklogic");
// const my = require("./my-connection.js");
// const db = marklogic.createDatabaseClient(my.connInfo);

// // Document descriptors to pass to write().
// const documents = [
//   {
//     uri: "/gs/aardvark.json",
//     content: {
//       name: "aardvark",
//       kind: "mammal",
//       desc: "The aardvark is a medium-sized burrowing, nocturnal mammal.",
//     },
//   },
//   {
//     uri: "/gs/bluebird.json",
//     content: {
//       name: "bluebird",
//       kind: "bird",
//       desc: "The bluebird is a medium-sized, mostly insectivorous bird.",
//     },
//   },
//   {
//     uri: "/gs/cobra.json",
//     content: {
//       name: "cobra",
//       kind: "mammal",
//       desc: "The cobra is a venomous, hooded snake of the family Elapidae.",
//     },
//   },
// ];

// // Load the example documents into the database
// db.documents.write(documents).result(
//   function (response) {
//     console.log("Loaded the following documents:");
//     response.documents.forEach(function (document) {
//       console.log("  " + document.uri);
//     });
//   },
//   function (error) {
//     console.log(JSON.stringify(error, null, 2));
//   }
// );

// const qb = marklogic.queryBuilder;

// db.documents.query(qb.where(qb.byExample({ kind: "mammal" }))).result(
//   function (documents) {
//     console.log("Matches for kind=mammal:");
//     documents.forEach(function (document) {
//       console.log("\nURI: " + document.uri);
//       console.log("Name: " + document.content.name);
//     });
//   },
//   function (error) {
//     console.log(JSON.stringify(error, null, 2));
//   }
// );
// Use the patch feature to update just a portion of a document,
// rather than replacing the entire contents.

// const marklogic = require("marklogic");
// const my = require("./my-connection.js");

// const db = marklogic.createDatabaseClient(my.connInfo);
// const pb = marklogic.patchBuilder;

// const document = [
//   {
//     uri: "/gs/test.json",
//     content: {
//       name: "test",
//       kind: "test",
//       desc: "TEeeeeeXt",
//     },
//   },
// ];

// db.documents.write(document).result(
//   function (response) {
//     console.log("Loaded the following documents:");
//     response.documents.forEach(function (document) {
//       console.log("  " + document.uri);
//     });
//   },
//   function (error) {
//     console.log(JSON.stringify(error, null, 2));
//   }
// );
// const marklogic = require("marklogic");
// const my = require("./my-connection.js");

// const db = marklogic.createDatabaseClient(my.connInfo);
// const qb = marklogic.queryBuilder;

// // The collection of objects to persist
// const pets = [
//   { name: "fluffy", kind: "cat" },
//   { name: "fido", kind: "dog" },
//   { name: "flipper", kind: "fish" },
//   { name: "flo", kind: "rodent" },
// ];
// const collName = "pets";

// // (1) Write the objects to the database
// db.createCollection(collName, pets)
//   .result()
//   .then(
//     function (uris) {
//       console.log("Saved " + uris.length + " objects with URIs:");
//       console.log(uris);

//       // (2) Read back all objects in the collection
//       return db.documents.query(qb.where(qb.collection(collName))).result();
//     },
//     function (error) {
//       console.log(JSON.stringify(error));
//     }
//   )
//   .then(function (documents) {
//     console.log("\nFound " + documents.length + " documents:");
//     documents.forEach(function (document) {
//       console.log(document.content);
//     });

//     // (3) Find the cats in the collection
//     return db.documents
//       .query(qb.where(qb.collection(collName), qb.value("kind", "cat")))
//       .result();
//   });
// const fs = require("fs");
// const marklogic = require("marklogic");
// const my = require("./my-connection.js");
// const jsonData = require("./json.json");

// const db = marklogic.createDatabaseClient(my.connInfo);

// db.graphs.write("application/rdf+json", jsonData).result(
//   function (response) {
//     if (response.defaultGraph) {
//       console.log("Loaded into default graph");
//     } else {
//       console.log("Loaded into graph " + response.graph);
//     }
//   },
//   function (error) {
//     console.log(JSON.stringify(error));
//   }
// );

// const fs = require("fs");
// const marklogic = require("marklogic");
// const my = require("./my-connection.js");

// const db = marklogic.createDatabaseClient(my.connInfo);
// // Load into a named graph using a write stream
// const writer = db.graphs.createWriteStream("turtle-graph", "text/turtle");
// writer.result(
//   function (response) {
//     if (response.defaultGraph) {
//       console.log("Loaded triples into default graph");
//     } else {
//       console.log("Loaded triples into graph " + response.graph);
//     }
//   },
//   function (error) {
//     console.log(JSON.stringify(error));
//   }
// );
// fs.createReadStream("turtle-graph.ttl").pipe(writer);

// db.graphs.read("example-graph", "text/turtle").result(
//   function (response) {
//     for (const line of response.split("\n")) {
//       console.log(line);
//     }
//   },
//   function (error) {
//     console.log(JSON.stringify(error));
//   }
// );

// const marklogic = require("marklogic");
// const my = require("./my-connection.js");

// const db = marklogic.createDatabaseClient(my.connInfo);

// const triples = [
//   "@prefix : <http://www.semanticweb.org/dmitry/ontologies/2022/1/untitled-ontology-9#> .",
//   "@prefix owl: <http://www.w3.org/2002/07/owl#> .",
//   "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .",
//   "@prefix xml: <http://www.w3.org/XML/1998/namespace> .",
//   "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .",
//   "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .",
//   "@base <http://www.semanticweb.org/dmitry/ontologies/2022/1/untitled-ontology-9> .",
//   `:Минеев Роман rdf:type owl:NamedIndividual ,
//                                    :Студент ;
//                           :Учится_на_специальности :Программная_инженерия ;
//                           :Является_студентом_группы :ПРО-420 .`,
// ];
// db.graphs
//   .merge({
//     uri: "turtle-graph",
//     contentType: "text/turtle",
//     data: triples.join("\n"),
//     repair: true,
//   })
//   .result(
//     function (response) {
//       console.log(JSON.stringify(response));
//     },
//     function (error) {
//       console.log(JSON.stringify(error));
//     }
//   );

const marklogic = require("marklogic");
const my = require("./my-connection.js");

const db = marklogic.createDatabaseClient(my.connInfo);

// const triples = [
//   "@prefix p1: <http://example.org/marklogic/predicate/> .",
//   "@prefix p0: <http://example.org/marklogic/people/> .",
//   'p0:Ivanov_Ivan1  p1:livesIn "Moscow1" .',
//   'p0:Petrov_Petr2    p1:livesIn "Moscow2" .',
// ];
// db.graphs
//   .merge({
//     uri: "TestGraph",
//     contentType: "text/turtle",
//     data: triples.join("\n"),
//     repair: true,
//   })
//   .result(
//     function (response) {
//       console.log(JSON.stringify(response));
//     },
//     function (error) {
//       console.log(JSON.stringify(error));
//     }
//   );
// const marklogic = require("marklogic");
// const my = require("./my-connection.js");

// const db = marklogic.createDatabaseClient(my.connInfo);
// const fgos_triples = {
//   "https://fgosvo.ru/fgosvo/index/24/9": {},
// };
// const triples_ = {
//   "http://dbpedia.org/resource/Joyce_Carol_Oates": {
//     "http://dbpedia.org/property/influences": [
//       {
//         type: "uri",
//         value: "http://dbpedia.org/resource/Ernest_Hemingway",
//       },
//     ],
//     "http://dbpedia.org/ontology/influencedBy": [
//       {
//         type: "uri",
//         value: "http://dbpedia.org/resource/Ernest_Hemingway",
//       },
//     ],
//   },
//   "http://dbpedia.org/resource/Death_in_the_Afternoon": {
//     "http://dbpedia.org/ontology/author": [
//       {
//         type: "uri",
//         value: "http://dbpedia.org/resource/Ernest_Hemingway",
//       },
//     ],
//     "http://dbpedia.org/property/author": [
//       {
//         type: "uri",
//         value: "http://dbpedia.org/resource/Ernest_Hemingway",
//       },
//     ],
//   },
// };

// db.graphs.write("application/rdf+json", triples).result(
//   function (response) {
//     if (response.defaultGraph) {
//       console.log("Loaded into default graph");
//     } else {
//       console.log("Loaded into graph " + response.graph);
//     }
//   },
//   function (error) {
//     console.log(JSON.stringify(error));
//   }
// );

// const triples = [
//   "@prefix cont: <http://example.org/marklogic/content/> .",
//   "@prefix p0: <http://example.org/marklogic/направления/> .",
//   "@prefix p1: <http://example.org/marklogic/специальность/> .",
//   "@prefix p2: <http://example.org/marklogic/predicate/> .",
//   `p1:Программная_инженерия [
//     cont:index "09.03.04";
//     cont:date "от 19 сентября 2017 г. N 920";
//     cont:competence "УК-1. Способен осуществлять поиск, критический анализ и синтез
//     информации, применять системный подход для решения
//     поставленных задач";
//     cont:point "4.4.3. Не менее 60 процентов численности педагогических работников Организации,
//     участвующих в реализации программы бакалавриата, и лиц, привлекаемых Организацией к
//     реализации программы бакалавриата на иных условиях (исходя из количества замещаемых ставок,
//     приведенного к целочисленным значениям), должны вести научную, учебно-методическую и (или)
//     практическую работу, соответствующую профилю преподаваемой дисциплины (модуля).
//     4.4.4. Не менее 5 процентов численности педагогических работников Организации,
//     участвующих в реализации программы бакалавриата, и лиц, привлекаемых Организацией к
//     реализации программы бакалавриата на иных условиях (исходя из количества замещаемых ставок,
//     приведенного к целочисленным значениям), должны являться руководителями и (или)
//     работниками иных организаций, осуществляющими трудовую деятельность в профессиональной
//     сфере, соответствующей профессиональной деятельности, к которой готовятся выпускники (иметь
//     стаж работы в данной профессиональной сфере не менее 3 лет).
//     4.4.5. Не менее 50 процентов численности педагогических работников Организации и лиц,
//     привлекаемых к образовательной деятельности Организации на иных условиях (исходя из
//     количества замещаемых ставок, приведенного к целочисленным значениям), должны иметь ученую
//     степень (в том числе ученую степень, полученную в иностранном государстве и признаваемую в
//     Российской Федерации) и (или) ученое звание (в том числе у";
//   ] .`,
// ];
// db.graphs
//   .merge({
//     uri: "fgos",
//     contentType: "text/turtle",
//     data: triples.join("\n"),
//     repair: true,
//   })
//   .result(
//     function (response) {
//       console.log(JSON.stringify(response));
//     },
//     function (error) {
//       console.log(JSON.stringify(error));
//     }
//   );

const query = [
  "SELECT ?p ?s",
  "WHERE {",
  "    <http://example.org/marklogic/специальность/Программная_инженерия> ?p ?s;",
  "    }",
];
db.graphs.sparql("application/sparql-results+json", query.join("\n")).result(
  function (result) {
    console.log(JSON.stringify(result, null, 2));
  },
  function (error) {
    console.log(JSON.stringify(error, null, 2));
  }
);

// db.graphs.read("TestGraph", "text/turtle").result(
//   function (response) {
//     for (const line of response.split("\n")) {
//       console.log(line);
//     }
//   },
//   function (error) {
//     console.log(JSON.stringify(error));
//   }
// );

// const query = [
//   `SELECT ?subject ?predicate ?object
//    WHERE {?subject ?predicate ?object}`,
// ];
// db.graphs.sparql("application/sparql-results+json", query.join("\n")).result(
//   function (result) {
//     console.log(JSON.stringify(result, null, 2));
//   },
//   function (error) {
//     console.log(JSON.stringify(error, null, 2));
//   }
// );
