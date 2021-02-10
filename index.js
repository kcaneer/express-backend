var express = require("express");
var app = express();

app.get("/api/details", function (req, res) {
  var sql = require("mssql");

  // config for your database
  var config = {
    user: "KennedyCaneer",
    password: "T@uranga",
    server: "sql.silverfern.group",
    database: "AcmeSalesDB",
  };

  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("select * FROM [dbo].[sales] INNER JOIN [dbo].[details] ON sales.Order_Id = details.Order_Id", function (err, recordset) {
      if (err) console.log(err);
      // send records as a response
      res.send(recordset);
    });
  });
});

var server = app.listen(5000, function () {
  console.log("Server is running..");
});
