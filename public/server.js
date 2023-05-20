// not work

(function serv () {
  "use strict";
  const express = require("express");
  const server = express();
  const bodyParser = require("body-parser");
  const port = 2000;


  const jsonParser = bodyParser.json();
  const urlencodedParser = bodyParser.urlencoded({ extended: false });

  server.get("/", function (req, res) {
    res.send("START LOCAL SERVER");
  });

  server.post("/", jsonParser, function (request, response) {
    if (!request.body) {
      console.log(request);
      return response.sendStatus(400);
    }
    console.log(request.body.data.map(e => e.isChk));
  });

  require("events").EventEmitter.defaultMaxListeners = 0;

  const appServer = server.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });

  process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Closing http server.");
    server.close(() => {
      console.log("Http server closed.");
      // boolean means [force], see in mongoose doc
      mongoose.connection.close(false, () => {
        console.log("MongoDb connection closed.");
        process.exit(0);
      });
    });
  });
  module.exports.appServer = appServer;
   
})();
