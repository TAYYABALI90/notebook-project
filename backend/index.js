let connectToMongo = require('./db');

let express = require('express');

let cors = require('cors');

connectToMongo();

let app = express();

let port = 5000;

app.use(cors());

app.use(express.json());

//Available Routes

app.use("/api/auth", require('./routes/auth'));

app.use("/api/notes", require('./routes/notes'));

app.listen(port, () => {

    console.log(`iNotebook Backend Listening At http://localhost:${port}`);

});