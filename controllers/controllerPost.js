// importo il file di connessione al database
import connection from '../data/db.js';


// ROTTE (endpoints) =

// Funzione per visualizzare tutti i "posts"
function index(req, res) {

    // Query da lanciare
    const sql = 'SELECT * FROM posts'

    // Eseguo la query
    connection.query(sql, (err, results) => {

        if (err) {

            // Se c'è un errore, invia una risposta con status 500
            return res.status(500).json({ error: 'Database query failed' });

        }

        // Rispondi con i risultati della query
        res.json(results);

        // I risultati verranno stampati qui
        console.log(results);

    });

}

// Funzione per eliminare un "post"
function destroy(req, res) {

    // Ottengo l'id del post da eliminare
    const { id } = req.params;

    // Query per eliminare il post
    const sql = 'DELETE FROM posts WHERE id = ?';

    // Eseguo la query
    connection.query(sql, [id], (err, results) => {

        if (err) {

            return res.status(500).json({ error: 'Database query failed' });

        }

        // Se il post non esiste, restituisci un errore
        if (results.affectedRows === 0) {

            return res.status(404).json({ error: 'Post not found' });

        }

        // Rispondi con un codice 204 (No Content) in caso di successo
        res.status(204).send();

    });

}

// Funzione per visualizzare un post con i relativi tag
function show(req, res) {

    // Ottiengo l'id del post dalla richiesta
    const { id } = req.params;

    // Query per recuperare il post specifico
    // const sql = 'SELECT * FROM posts WHERE id = ?';

    // Query per recuperare il post con i tag associati
    const sql = `
    SELECT p.id, p.title, p.content, p.image, 
    GROUP_CONCAT(t.label) AS tags
    FROM posts p
    LEFT JOIN post_tag pt ON p.id = pt.post_id
    LEFT JOIN tags t ON pt.tag_id = t.id
    WHERE p.id = ?
    GROUP BY p.id;
    `;


    // Eseguo la query
    connection.query(sql, [id], (err, results) => {

        if (err) {

            return res.status(500).json({ error: 'Database query failed' });

        }

        // Se il post non esiste, restituisci un errore
        if (results.length === 0) {

            return res.status(404).json({ error: 'Post not found' });

        }

        // Restituisco il post con i tag come array
        const post = results[0];
        post.tags = post.tags ? post.tags.split(',') : [];

        res.json(post);

        // Rispondi con il post trovato in formato JSON
        // res.json(results[0]);

    });

}

// Esporto tutto
export { index, destroy, show };
