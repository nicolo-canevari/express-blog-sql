const express = require('express');
const router = express.Router();

// Importo le funzioni del controller
const { index, destroy, show } = require('../controllers/controllerPost');


// Definisco le rotte

// Index: Visualizza tutti i post
router.get('/', index);

// Show: Visualizza un post tramite id
router.get('/:id', show);

// Store: Crea un nuovo post
// router.post('/', store);

// Update: Modifica un post tramite id
// router.put('/:id', update);

// Destroy: Cancella un post tramite id
router.delete('/:id', destroy);

// esportazione del router
module.exports = router;