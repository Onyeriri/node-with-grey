const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');
const fsPromises = require('fs').promises;

const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data; }
};

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Password and username is required!!!' });
    // checking the database for a match
    const foundUser = userDB.users.find((person) => person.username === user);
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    // evaluate password
    const match = bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // Create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken }
        console.log(otherUsers);
        userDB.setUsers([...otherUsers, currentUser])
        fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({accessToken});
    } else
        res.sendStatus(401);
};

module.exports = handleLogin;