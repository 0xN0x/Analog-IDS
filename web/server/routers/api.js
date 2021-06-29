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

router.get('/logs', (req, res) => {
  global.db.getLogs(req.query.before, req.query.after, req.query.flagged).then((val) => {
    let allowed_services = req.query.services ? req.query.services.split(',') : undefined;
    let returned = [];

    if (allowed_services) {
      for (row of val) {
        if (allowed_services.indexOf(row.app) > -1) {
          returned.push(row)
          continue;
        }
      }
    } else {
      returned = val;
    }

    res.status(200).send(returned);
  });
});

router.get('/logs/stats', (req, res) => {
  global.db.getLogsByDays().then((logs_by_days) => {
    global.db.getLogsByService().then((logs_by_services) => {
      global.db.getSSHLogs().then((ssh_logs) => {
        res.status(200).send({
          "by_services": logs_by_services,
          "by_days": logs_by_days,
          "ssh": ssh_logs
        });
      })
    });
  });
});

router.get('/logs/services', (req, res) => {
  global.db.getServices().then((val) => {
    res.status(200).send(val);
  });
});


module.exports = router;
