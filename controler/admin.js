// ------------------USER SIGNUP API-----------------------

const admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = "@divya";


const createAdminAcount = async (req, res) => {
    const { name, password } = req.body;
    const hashPassword = bcrypt.hashSync(password);

    await new admin({ name, password: hashPassword }).save().
        then(() => res.status(200).send({ "Massage": "User Acount Created !!!" })).
        catch((err) => res.status(401).send(err))
};


// ------------------USER LOGIN API-----------------------

const adminLogin = async (req, res) => {
    const data = await admin.findOne({ name: req.body.name });
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

const findAdmin = async(req, res) => {
    await admin.findOne({name: req.params.key}).
      then( (data) => res.status(200).send(data)).
        catch( (err) => res.status(401).send(err))
}

// ------------------USER DELETE API-----------------------

const deleteAdmin = async (req, res) => {
    const data = await admin.deleteOne({ _id: req.params.id })
    data.deletedCount == 1 ? res.send({ "Massage": "Data Deleted!!" }) :
        res.send({ "Massage": "Data Not Found!!" });
};

// ------------------USER UPDATE API-----------------------

const updateAdmin = async (req, res) => {
    const data = await admin.updateOne(
        { name: req.body.name },
        {
            $set: { password: req.body.password }
        }
    )
    data.modifiedCount == 1 ? res.send({ "Massage": "Data Modified!!" }) :
        res.send({ "Massage": "Data Not Found!!" });
};

module.exports = { createAdminAcount, adminLogin, findAdmin, deleteAdmin, updateAdmin }