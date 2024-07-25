const product = require('../models/product');
const category = require('../models/category');
const multer = require('multer');
const { unlink } = require('fs').promises;


// -----------------------------------DELETE FILE------------------------------------------

const deleteFile = async filePath => {
    await unlink(filePath);
}


// ---------------------------------PRODUCT POST API--------------------------------------------

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("multer");
        console.log(req.file)
        cb(null, '../frontcode/public/')
    },
    filename: function (req, file, cb) {
        console.log(req.file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file?.originalname)
    }
})

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            console.log(req.body)
            console.log(req.file)
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: err.message });
            } else if (err) {
                return res.status(500).json({ msg: err.message });
            }

            const newProduct = new product({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                image: req.file ? req.file.originalname : '',
                qty: req.body.qty,
                discription: req.body.discription
            });
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ------------------PRODUCT GET API-----------------------

const getProduct = async (req, res) => {
    await category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "name",
                foreignField: "category",
                as: "showdata"
            }
        },
        {
            $project: {
                _id: 0,
                showdata: 1
            }
        }
    ]).then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

// ------------------PRODUCT SEARCH API-----------------------

const productSearch = async (req, res) => {
    await product.find({ _id: req.params.id }).
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

// ------------------CART DELETE API-----------------------

const productDelete = async (req, res) => {
    await product.findOne({ _id: req.params.id }, { _id: 0, image: 1 }).
        then((data) => deleteFile(`../frontcode/public/${data.image}`)).
        catch((error) => console.log(""));

    await product.deleteOne({ _id: req.params.id }).
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};


const updates = multer({ storage: storage });
const productUpdate = async (req, res) => {
    try {
        updates.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: err.message });
            } else if (err) {
                return res.status(500).json({ msg: err.message });
            }


            await product.findOne({ _id: req.params.id }, { _id: 0, image: 1 }).
                then((data) => typeof (req.file?.originalname) == 'string' && req.file?.originalname != data.image ? deleteFile(`../frontcode/public/${data.image}`) : "").
                catch((error) => console.log(error));


            await product.updateOne(
                { _id: req.params.id },
                {
                    $set: ({
                        name: req.body.name,
                        price: req.body.price,
                        category: req.body.category,
                        image: req.file?.originalname,
                        qty: req.body.qty,
                        discription: req.body.discription
                    })
                }
            ).then((data) => res.status(200).send(data));
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { addProduct, getProduct, productSearch, productDelete, productUpdate }
