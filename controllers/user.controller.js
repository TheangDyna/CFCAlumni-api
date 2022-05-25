const db = require('./../models');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
        if (!isEmail(email)) {
            return res.status(400).send({ message: 'Unvalid email format.' });
        }
        if(password.length < 6){
            return res.status(400).send({ message: 'Password atleast 6 digits.' })
        }
        const isExist = await db.users.findOne({ email: email });
        if (isExist) {
            return res.status(400).send({ message: 'This email already in use.' });
        }
        const newUser = new db.users({
            name: name,
            emailL: email,
            role: role,
            password: bcrypt.hashSync(password, 8),
        });
        const data = await newUser.save();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: 'Internal Sever Error.' });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.users.findOne({ email: email });
        if (!user) {
            return res.status(401).send({ message: 'No User, Please register an account.' });
        }
        const match = await bcrypt.compareSync(password, user.password);
        if(!match){
            return res.status(401).send({ message: 'Wrong Password' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Internal Sever Error.' });
    }
};

const getUser = async (req, res) => {
    try {
        const data = await db.users.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error })
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const body = req.body;
    if (Object.keys(body).length === 0) {
        return res.status(400).send({ message: 'bad request' });
    }
    try {
        const data = await db.users.findByIdAndUpdate(userId, body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const data = await db.users.findByIdAndDelete(userId);
        res.status(200).send({ message: 'Deleted Succesful' })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

module.exports = {
    signup,
    signin,
    getUser,
    updateUser,
    deleteUser,
}