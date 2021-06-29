const bcrypt = require('bcrypt');
const BcryptSalt = require('bcrypt-salt');
const uuid = require('uuid');

const bs = new BcryptSalt();

class Database {
    constructor(host, port, db, io) {
        this.r = require('rethinkdbdash')({ 
            host: host,
            port: port,
            db: db
        });

        this.io = io;
    }

    init() {
        this.checkPasswordValidity(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD).then((val) => {
            if (val) return;

            this.r.table('users').delete().run().then(() => {
                this.insertUser(
                    process.env.ADMIN_EMAIL, 
                    process.env.ADMIN_PASSWORD,
                    "Analog",
                    "administrator",
                    "Admin"
                );
            });
        });

        this.r.table('log').changes().run().then((cursor) => {
            cursor.each((err, value) => {
                if (err) return console.log(err);
        
                this.io.emit("log", value.new_val);
            });
        });
    }

    /**
     * Get a user by is UUID
     * @param {UUIDv4} id 
     * @returns {Promise}
     */
    getUserByID(id) {
        return this.r.table('users').filter(this.r.row('id').eq(id)).run();
    }

    /**
     * Get a user by is UUID
     * @param {UUIDv4} id 
     * @returns {Promise}
     */
    getUserByMail(mail) {
        return this.r.table('users').filter(this.r.row('email').eq(mail)).run();
    }

    /**
     * Insert user in database
     * @param {String} mail 
     * @param {String} password 
     * @returns 
     */
    insertUser(mail, password, firstname, lastname, role) {
        return this.r.table('users').insert({
            email: mail,
            password: bcrypt.hashSync(password, bs.saltRounds),
            firstname: firstname,
            lastname: lastname,
            role: role
        }).run();
    }

    /**
     * Update the user
     * @param {UUIDv4} id 
     * @param {Object} update 
     * @returns 
     */
    updateUser(id, update) {
        return this.r.table('users').filter(this.r.row('id').eq(id)).update(update).run();
    }

    /**
     * Check if a tuple mail/password is valid
     * @param {String} mail 
     * @param {String} password 
     * @returns {Boolean} Is the mail and password valid
     */
    checkPasswordValidity(mail, password) {
        return this.getUserByMail(mail).then((user) => {
            if (user.length == 0) return false;

            return bcrypt.compareSync(password, user[0].password);
        });
    };

    /**
     * 
     */
    getServices() {
        return this.r.db('analog').table('log')('app').distinct().run()
    };

    getLogs(before, after, flagged) {
        if (!before) before = "" + Math.floor(Date.now() / 1000);
        if (!after) after = "0";

        if (flagged === '1') {
            return this.r.db('analog').table('log').filter(
                this.r.row('date').lt(before).and(
                    this.r.row('date').gt(after)
                ).and(
                    this.r.row('tag').count().gt(0)
                )
            ).orderBy(this.r.desc('date'));
        } else {
            return this.r.db('analog').table('log').filter(
                this.r.row('date').lt(before).and(
                    this.r.row('date').gt(after)
                )
            ).orderBy(this.r.desc('date'));
        }
    }

    getLogsByDays() {
        const day_step = 86400;
        const today = `${new Date().setHours(0, 0, 0, 0)}`.slice(0, -3);
        
        return this.r.db('analog').table('log').filter(
            this.r.row('date').gt(`${today - (day_step * 7)}`)
        ).orderBy(this.r.desc('date')).run().then((res) => {
            let timestamps = [];
            let days = [];
            let flags = [];

            for (let row of res) {
                timestamps.push(row);
            }

            for (let i = 0; i < 7; i++) {
                days[i] = 0;
                flags[i] = 0;

                for (let j = 0; j < timestamps.length; j++) {
                    if (timestamps[j].date > (today - (day_step * i))) {
                        days[i] += 1;

                        if (timestamps[j].tag.length > 0) {
                            flags[i] += 1;
                        }
                    } else {
                        timestamps = timestamps.slice(days[i]);
                        break;
                    }
                }

                if (days[i] === 1) timestamps = timestamps.slice(1);                
            }

            return [days, flags];
        });
    }
}

module.exports = {
    Database,
};