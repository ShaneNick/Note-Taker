const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./controllers');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.use(routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
