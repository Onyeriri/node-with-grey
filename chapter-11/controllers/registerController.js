const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {this.users = data}
};

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) return res.status(400).json({ 'message': 'user name and password is required' });
    // check for duplicates
    const duplicates = userDB.users.find((person) => person.user === user);
    if (duplicates) return res.sendStatus(409); //conflict
    
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = {
            "username": user,
            "password": hashedPwd
        };
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDB.users));

        console.log(userDB.users);
        res.status(201).json({ 'success': `New user ${user} created!` })
        
    } catch (error) {
        res.status(500).json({'message': error.message})
    }
}

module.exports = handleNewUser;

