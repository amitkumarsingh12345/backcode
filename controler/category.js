
const category = require('../models/category');

// ------------------DELETE PRODUCTS WHEN DELETE CATEGOTY-----------------------

const deleteProductHandler = async (props) => {
    try {
        const dt = await product.deleteMany({ category: props });
        console.log(dt);
    } catch (error) {
        res.status(401).send(error);
    }
}

// ------------------ADD CATEGORY API-----------------------

const addCategory = async(req, res) => {
    await new category(req.body).save().
        then((data) => res.status(200).send(data)).
        catch(() => res.status(400).send(error));
}

// ------------------CATEGORY GET API-----------------------

const findCategory = async (req, res) => {
    console.log(req.body);
    await category.find().
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error))
};

// ------------------CATEGORY SEARCH API-----------------------

const searchCategory = async (req, res) => {
    await category.find(
        { _id: req.params.key }
    ).then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

// ------------------CATEGORY DELETE API-----------------------

const deleteCategory = async (req, res) => {
    try {
        await category.findOne({ _id: req.params.id }).
            then((data) => deleteProductHandler(data.name))
console.log(req.params.id)
        await category.deleteOne({ _id: req.params.id }).
            then((data) => res.status(200).send(data))
    } catch (error) {
        res.status(400).send(error);
    }
};

// ------------------CATEGORY UPDATE API-----------------------

const updateCategory = async (req, res) => {
    await category.updateOne(
        { _id: req.params.id },
        {
            $set: (req.body)
        }
    ).then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

module.exports = { addCategory, findCategory, searchCategory, deleteCategory, updateCategory }