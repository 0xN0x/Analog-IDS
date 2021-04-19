const bcrypt = require('bcrypt');
const BcryptSalt = require('bcrypt-salt');
const uuid = require('uuid');
const r = require('rethinkdbdash')({ db: 'analog' });

const bs = new BcryptSalt();

// USERS FUNCTIONS
/**
 * Get a user by is UUID
 * @param {UUIDv4} id 
 * @returns {Promise}
 */
const getUser = id => r.table('users').filter(r.row('id').eq(id)).run();
const insertUserCustom = value => r.table('users').insert(value).run();

const insertUser = (mail, password) => r.table('users').insert({ 
    id: uuid.v4(), 
    mail,
    password: bcrypt.hashSync(password, bs.saltRounds)
}).run();

const updateUser = (id, update) => r.table('users').filter(r.row('id').eq(id)).update(update).run();
const updateUserOneValue = (id, key, value) => r.table('users').filter(r.row('id').eq(id)).update({ [key]: value }).run();

/**
 * Check if a tuple mail/password is valid
 * @param {String} mail 
 * @param {String} password 
 * @returns {Boolean} Is the mail and password valid
 */
const checkPasswordValidity = (mail, password) => {
    user = r.table('users').filter(r.row('mail').eq(mail)).run();

    return bcrypt.compareSync(password, user.password);
};

module.exports = {
    getUser,
    insertUserCustom,
    insertUser,
    updateUserOneValue,
    updateUser,
    checkPasswordValidity,
};