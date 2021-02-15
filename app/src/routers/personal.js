/** Routes de l'API
 * @module routers/personal
 * @namespace PersonalRoute
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

/**
 * Page d'accueil des utilisateurs authentifiés
 * @function
 * @async
 * @memberof PersonalRoute
 * @name get/
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
