const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data; }
};

const fsPromises = require('fs').promises;
const path = require('path');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const handleLogout = async (req, res) => {
    // on client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // is refreshToken in db?
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);

    const currentUser = { ...foundUser, refreshToken: '' };
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(userDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true }); // secure true - on serve on https

    res.sendStatus(204);
};

module.exports = handleLogout;