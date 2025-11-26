const Product = require("../models/Product");



const getAllProducts = async (req, res) => {

    let columns = req.query.columns

    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    let skip = (page - 1) * limit
    let orderBy = req.query.orderBy || "createdAt"
    let orderType = req.query.orderType === "desc" ? -1 : 1

    let products = await Product.find()
        .populate("category")
        .skip(skip)
        .limit(limit)
        .select(columns ? columns.split(",").join(" ") : "")
        .sort({ [orderBy]: orderType });

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
}


module.exports = {
    getAllProducts
};