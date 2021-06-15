const db = require('../lib/db.js')

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

db.init();

router.post('/login', (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) res.sendStatus(400);

  if (req.body.email == "admin@admin.fr" && req.body.password == "admin") {
      res.status(200).send({
          message: "OK",
          data: {
              avatar: '/static/images/avatars/avatar.png',
              jobTitle: 'BSI',
              firstname: 'Mickael',
              lastname: 'Courtiade',
              email: req.body.email,
              city: 'Rennes',
              country: 'FR',
              timezone: 'GMT+2'
          }
      });
  } else {
      res.status(200).send({
          message: "Invalid email or password"
      })
  }
});

router.get('/logs/stats', (req, res) => {
  res.status(200).send({
      "by_services": [
          {
              title: 'Apache2',
              value: 50,
              icon: LaptopMacIcon,
              color: colors.indigo[500]
          },
          {
              title: 'SSH',
              value: 10,
              icon: TabletIcon,
              color: colors.red[600]
          },
          {
              title: 'CRON',
              value: 15,
              icon: PhoneIcon,
              color: colors.orange[600]
          },
          {
              title: 'Rsyslogd',
              value: 15,
              icon: PhoneIcon,
              color: colors.orange[600]
          },
          {
              title: 'Sytemctl',
              value: 10,
              icon: PhoneIcon,
              color: colors.orange[600]
          }
      ]
  });
});


module.exports = router;
