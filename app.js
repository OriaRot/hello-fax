const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 3500;
  
app.use(require("cors")());

app.use(express.json());

app.use("/files", require("./fileRouter"));

app.listen(PORT, () => console.log("server runing on port: |||| ", PORT));
