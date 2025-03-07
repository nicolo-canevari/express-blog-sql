// importo il pacchetto express
const express = require('express');
// importo il CORS
const cors = require("cors");
// creo l'applicazione Express per configurare il server e le rotte
const app = express();
// porta su cui il server ascolterà le richieste HTTP
const port = 3000;


// importo il router dei post
const postRouter = require('./routers/posts');


// Middleware CORS a tutte le richieste
app.use(cors({

    origin: ['http://localhost:5173', 'http://localhost:3000']

}));

// middleware per gestire le richieste JSON
app.use(express.json());

// Gestisco la rotta principale
app.get('/', (req, res) => {

    res.send('Server del mio blog')

});

// Utilizzo il router dei post per le rotte /posts
app.use("/posts", postRouter);

// Importo i Middleware
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// Middleware per gestire le rotte non trovate (404)
app.use(notFound);

// Middleware per gestire errori generici del server (500)
app.use(errorHandler);

// Ascolta sulla porta 3000
app.listen(port, () => {

    // stampo sul terminale
    console.log(`Server in ascolto sulla porta ${port}`)

});

// gestione dei file statici della cartella 'public'
// app.use(express.static('public'));





