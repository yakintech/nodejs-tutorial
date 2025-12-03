const Product = require("../models/Product");




const productController = {
    getAll: async (req, res) => {

        let columns = req.query.columns

        let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 10
        let skip = (page - 1) * limit
        let orderBy = req.query.orderBy || "createdAt"
        let orderType = req.query.orderType === "desc" ? -1 : 1


        let products = await Product.find()
            // .populate("category")
            // .skip(skip)
            // .limit(limit)
            // .select(columns ? columns.split(",").join(" ") : "")
            // .sort({ [orderBy]: orderType });

        if (columns) {
            columns = columns.split(",").join(" ")
        }


        //let products = await Product.find().populate("category").select(columns)
        // let products = await Product.find().populate("category").select("name category price")

        return res.json({
            page,
            limit,
            count: products.length,
            products
        })
    },
    getById: async (req, res) => {
        let id = req.params.id
       
        let product = await Product.findById(id).populate("category")
        return res.json(product)
    },
    create: async (req, res) => {
        let newProduct = new Product(req.body)
        await newProduct.save()
        return res.status(201).json(newProduct)
    },
    update: async (req,res) => {
        let id = req.params.id
        let updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new:true})
        return res.json(updatedProduct)
    },
    delete: async (req,res) => {
        let id = req.params.id
        await Product.findByIdAndDelete(id)
        return res.status(204).send()
    }
}




module.exports = {
    productController
};