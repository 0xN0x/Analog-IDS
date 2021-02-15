const data = require(`../settings.json`)


/** Routes de l'API
 * @module routers/api
 * @namespace ApiRoutes
 * @requires express
 */

/**
 * Module Express
 * @const
 */
const express = require('express');

/**
 * Router Express
 * @type {object}
 * @const
 */
const router = express.Router();

function authent(req, res, next) {
  res.json({"error": "Authentication needed"})
}

/**
 * Cette fonction vérifie que tous les paramètres globaux de l'API sont respectés
 * 
 * - Vérification que la méthode utilisée fait partie des méthodes autorisées
 * - Verification de la présence du Content-Type: application/json
 *   Toutes les requêtes POST et PUT n'ayant pas cet header et n'envoyant
 *   pas des données JSON renverra une erreur
 * @function
 * @async
 * @memberof ApiRoutes
 * @name all/*
 */
router.all('*', async (req, res, next) => {
  // Si la méthode ne fait pas partie des méthode autorisée
  if (data.ALLOWED_METHODS.indexOf(req.method) == -1) {
    // Renvoi d'une erreur 405
    return res.status(405).json({"error": "Method not allowed"})
  }

  // Si la méthode est POST ou PUT
  if (data.VERIFY_CONTENT_TYPE && (req.method == "POST" || req.method == "PUT")) {
    // Et que le Content-Type n'est pas du JSON
    if (!req.is('json')) {
      // Renvoi d'une erreur
      return res.status(400).json({"error": "JSON data was espected"})
    }
  }

  // Sinon, continuer
  next()
});

/**
 * Index de l'API
 * @function
 * @async
 * @memberof ApiRoutes
 * @name get/
 */
router.get('/', (req, res, next) => {
  res.json("test");
});

/**
 * Version de l'API
 * @function
 * @async
 * @memberof ApiRoutes
 * @name get/version
 */
router.get('/version', (req, res, next) => {
  res.json({"version": data.VERSION});
});

// ================ //
/** 
 * @namespace Users
 * @memberof ApiRoutes
 */
// ================ //


/**
 * Détails des utilisateurs existants
 * @function
 * @async
 * @memberof ApiRoutes.Users
 * @name get/users
 */
router.get('/users', authent, async (req, res, next) => {
  res.json({"test": 1})
});


/**
 * Création d'un nouvel utilisateur
 * @function
 * @async
 * @memberof ApiRoutes.Users
 * @name post/users
 */
router.post('/users', authent, async (req, res, next) => {

});

/**
 * Détails d'un utilisateur
 * @function
 * @async
 * @memberof ApiRoutes.Users
 * @name get/users/:userID
 * @param {int} userID ID de l'utilisateur à détailler
 */
router.get('/users/:userID', authent, async (req, res, next) => {

});

/**
 * Modifier un utilisateur
 * @function
 * @async
 * @memberof ApiRoutes.Users
 * @name put/users/:userID
 * @param {int} userID ID de l'utilisateur à modifier
 */
router.put('/users/:userID', authent, async (req, res, next) => {

});

/**
 * Supprimer un utilisateur
 * @function
 * @async
 * @memberof ApiRoutes.Users
 * @name delete/users/:userID
 * @param {int} userID ID de l'utilisateur à supprimer
 */
router.delete('/users/:userID', authent, async (req, res, next) => {

});

// ================ //
/**
 * @namespace Actions
 * @memberof ApiRoutes
 */
// ================ //

/**
 * Détails des actions existantes
 * @function
 * @async
 * @memberof ApiRoutes.Actions
 * @name get/actions
 */
router.get('/actions', authent, async (req, res, next) => {

});

/**
 * Création d'une nouvelle action
 * @function
 * @async
 * @memberof ApiRoutes.Actions
 * @name post/actions
 * @param {Object} data
 */
router.post('/actions', authent, async (req, res, next) => {

});

/**
 * Détail d'une action
 * @function
 * @async
 * @memberof ApiRoutes.Actions
 * @name get/actions/:actionID
 * @param {int} actionID ID de l'action à détailler
 */
router.get('/actions/:actionID', authent, async (req, res, next) => {

});

/**
 * Modification d'une action
 * @function
 * @async
 * @memberof ApiRoutes.Actions
 * @name put/actions/:actionID
 * @param {int} actionID ID de l'action à modifier
 */
router.put('/actions/:actionID', authent, async (req, res, next) => {

});

/**
 * Suppression d'une action
 * @function
 * @async
 * @memberof ApiRoutes.Actions
 * @name delete/actions/:actionID
 * @param {int} actionID ID de l'action à supprimer
 */
router.delete('/actions/:actionID', authent, async (req, res, next) => {

});

/**
 * 
 */
module.exports = router;
