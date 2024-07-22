// ------------------USER SIGNUP API-----------------------

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = "@divya";


const createUserAcount = async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password);

    await new user({ name, email, password: hashPassword }).save().
        then(() => res.status(200).send({ "Massage": "User Acount Created !!!" })).
        catch((err) => res.status(401).send(err))
};


// ------------------VERIFY TOKEN-----------------------

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(400).send("Please? Provide Valid Token");
            } else {
                next();
            }
        })
    } else {
        res.status(401).send("Please Provise Token!!");
    }
}

// ------------------USER LOGIN API-----------------------

const userLogin = async (req, res) => {
    console.log(req.body)
    const data = await user.findOne({ email: req.body.email });
    if (data) {
        const checkPassword = bcrypt.compareSync(req.body.password, data.password);
        if (checkPassword) {
            jwt.sign({ data }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.status(401).send("Something Went Wrong: " + err);
                }
                res.status(201).send({ data, auth: token });
            });
        } else {
            res.send("Invalid Password !!")
        }
    } else {
        res.send("This Acount Not Exist !!")
    }
}

// ------------------USER SEARCH API-----------------------

const findUser = async(req, res) => {
    await user.findOne({email: req.params.id}).
      then( (data) => res.status(200).send(data)).
        catch( (err) => res.status(401).send(err))
}

// ------------------USER DELETE API-----------------------

const deleteUser = async (req, res) => {
    const data = await user.deleteOne({ _id: req.params.id })
    data.deletedCount == 1 ? res.send({ "Massage": "Data Deleted!!" }) :
        res.send({ "Massage": "Data Not Found!!" });
};

// ------------------USER UPDATE API-----------------------

const updataUser = async (req, res) => {
    const data = await user.updateOne(
        { email: req.body.email },
        {
            $set: { password: req.body.password }
        }
    )
    data.modifiedCount == 1 ? res.send({ "Massage": "Data Modified!!" }) :
        res.send({ "Massage": "Data Not Found!!" });
};

module.exports = { createUserAcount, userLogin, verifyToken,findUser, deleteUser, updataUser }