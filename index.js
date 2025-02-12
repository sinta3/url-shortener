require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('@configs/db.config')
const errorHandler = require('@middlewares/errorHandler.middleware')
const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('@routes/user.routes');
const shortenedUrlRoutes = require('@routes/shortenedUrl.routes');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'Url shortener by sinta3'});
})

app.use('/user', userRoutes);
app.use('/shortened', shortenedUrlRoutes);
app.use(errorHandler);

if(db){
    app.listen(port, '0.0.0.0', () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
}