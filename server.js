const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const html = require("./routes/htmlRoutes");
const api = require("./routes/apiRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use(api);
app.use(html);

app.listen(PORT, () =>
  console.log(`Listening Server at http://localhost:${PORT}`)
);