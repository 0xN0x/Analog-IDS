/** Routes de l'API
 * @module routers/api
 * @namespace ApiRoutes
 * @requires express
 */

/**
 * Router Express
 * @type {object}
 * @const
 */
const router = require('express').Router();;

router.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) res.sendStatus(400);

  global.db.checkPasswordValidity(req.body.email, req.body.password).then((val) => {
    console.log(val);

    if (!val) {
      res.status(200).send({
        message: "Invalid email or password"
      });
    } else {
      global.db.getUserByMail(req.body.email).then((user) => {
        res.status(200).send({
          message: "OK",
          data: {
            email: user[0].mail,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            role: user[0].role
          }
        });
      });
    }
  });
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
