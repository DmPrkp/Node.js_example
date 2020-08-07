let express = require('express');
let app = express();
let route = require('./routes/products.js')
app.use('/', route);

app.listen(3000);