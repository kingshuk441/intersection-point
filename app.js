const express = require("express");
const bodyParser = require("body-parser");

const pointRoutes = require("./routes/points");

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", pointRoutes);

app.listen(port, () => {
  console.log(`listening at port at ${port}`);
});
