import mysql from 'mysql2';

// Creo la connessione al database utilizzando le credenziali
const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'Pizzapazza33',
    database: 'blog_db.sql'

});

//   Avvio la connessione al database
connection.connect((err) => {

    if (err) {
        // Se c'è un errore nella connessione, lo stampiamo in console
        console.error('Errore di connessione al database:', err);
        // Interrompiamo l'esecuzione in caso di errore
        return;

    }

    // Se la connessione va a buon fine
    console.log('Connesso al database MySQL');

});

// Esporto l'oggetto connection per usarlo in altri file
export default connection;