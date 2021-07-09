import express from "express";

const app = express();

app.get("/sky/:sear", (req, res, next) => {
  console.log(req.params);
  console.log(req.query);

  res.setHeader("key", "value");
  res.send("hi");
});

app.listen(8080);
