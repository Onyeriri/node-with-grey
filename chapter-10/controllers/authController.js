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
        return res.status(200).json(`User ${user} is logged in`);
    } else
        res.sendStatus(401);
};

module.exports = handleLogin;