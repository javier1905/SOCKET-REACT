const express = require("express");
const path = require("path");
const favicon = require("express-favicon");

const server = express();

server.set("port", process.env.PORT || 3000);
server.use(express.static(path.join(__dirname, "build")));
// server.use(express.json)
// server.use(express.urlencoded({extended:false}))
server.use(express.static(__dirname));
server.use(favicon(path.join(__dirname, "build", "favicon.ico")));

server.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

server.listen(server.get("port"), (e) =>
  e ? console.log(e) : console.log("conectado al puerto 3000")
);
