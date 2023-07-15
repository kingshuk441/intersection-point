const express = require('express');
const bodyParser = require('body-parser');


const pointRoutes = require('./routes/points');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', pointRoutes);


app.listen(8000, () => {
    console.log('listening at port 8000')
});