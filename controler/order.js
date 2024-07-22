const order = require('../models/order');
const user = require('../models/user');

// --------------------------------ORDER POST API-------------------------------------

const addOrder = async (req, res) => {
    await new order(req.body).save().
        then(() => res.status(200).send({ Massage: 'Order Success' })).
        catch((error) => res.status(400).send(error));
};

// --------------------------------ORDER DELETE API-------------------------------------

const deleteOrder = async (req, res) => {
    await order.deleteOne({ _id: req.params.id }).
        then(() => res.status(200).send({ Massage: 'Order Deleted' })).
        catch((error) => res.status(400).send(error));
};

// --------------------------------ORDER GET API-------------------------------------

const orderGet = async (req, res) => {
    await user.aggregate([
        {
            $lookup: {
                from: "orders",
                localField: "email",
                foreignField: "useremail",
                as: "showdata"
            }
        },

    ]).then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error))
};

module.exports = { addOrder, deleteOrder, orderGet};