const bcrypt = require('bcrypt');
const BcryptSalt = require('bcrypt-salt');
const uuid = require('uuid');
const r = require('rethinkdbdash')({ 
    host: 'db',
    port: '28015',
    db: 'analog'
});

const bs = new BcryptSalt();

class Database {
    constructor(host, port, db, io) {
        this.r = require('rethinkdbdash')({ 
            host: host,
            port: port,
            db: db
        });

        this.io = io;

        r.table('log').changes().run().then((cursor) => {
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
    getUser(id) {
        return r.table('users').filter(r.row('id').eq(id)).run();
    }

    /**
     * Insert user in database
     * @param {String} mail 
     * @param {String} password 
     * @returns 
     */
    insertUser(mail, password) {
        return r.table('users').insert({ 
            id: uuid.v4(), 
            mail,
            password: bcrypt.hashSync(password, bs.saltRounds)
        }).run();
    }

    /**
     * 
     * @param {UUIDv4} id 
     * @param {Object} update 
     * @returns 
     */
    updateUser(id, update) {
        return r.table('users').filter(r.row('id').eq(id)).update(update).run();
    }

    /**
     * Check if a tuple mail/password is valid
     * @param {String} mail 
     * @param {String} password 
     * @returns {Boolean} Is the mail and password valid
     */
    checkPasswordValidity(mail, password) {
        user = r.table('users').filter(r.row('mail').eq(mail)).run();

        return bcrypt.compareSync(password, user.password);
    };
}



module.exports = {
    Database,
    init,
    insertUserCustom,
    insertUser,
    updateUserOneValue,
    updateUser,
    checkPasswordValidity,
};