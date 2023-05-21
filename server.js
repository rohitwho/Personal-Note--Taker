const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


const html = require("./routes/htmlRoutes");
app.use(html);

const api = require("./routes/apiRoutes");
app.use(api);










app.listen(PORT, () =>
  console.log(`Listening Server at http://localhost:${PORT}`)
);