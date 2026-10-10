import pool from "../config/db.js";

// Get all data
export const getAllCategories = async (req, res) => {

    try {
        const [categories] = await pool.query("SELECT * FROM categories ORDER BY id DESC")
        return res.status(200).json({
            status: true,
            total: categories.length,
            data: categories,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            massage: error.massage
        })
    }

}
// get one data
export const getOneCategory = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                status: false,
                message: "not a number"
            })
        }
        const [category] = await pool.query("SELECT * FROM categories WHERE id=?", [id])
        if(category.length ===0){
            return res.status(404).json({
                status: false,
                message: "theres no data"
            })
        }
        return res.status(200).json({ status: true, data: category })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.massage
        })
    }
}
//create
export const createCategory = async (req,res) => {
    try {
        const {name} = req.body 
        if (!name) {
            return res.status(400).json({
            status: false,
           
            message: "name must be required",
        })

        }
        const category = await pool.query("INSERT INTO categories (name) VALUES (?)", [name])
        return res.status(200).json({
            status: true,
            data: category,
            message: "insert is SUCCESS",
        })
        
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
             return res.status(400).json({
            status: false,
           
            message: "category name is already exist",
        })
        }
         return res.status(500).json({
            status: false,
            message: error.message,
        })
    }
}
//update
export const updateCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body
        if (isNaN(id)) {
            return res.status(400).json({
                status: false,
                message: "is Not a Number"
            });
        }
        const category = await pool.query("UPDATE categories SET name=? WHERE id=?", [name, id]);
        if (category.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Data is Not Found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Update Success"
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Update Failed",
            error: error.message
        })
    }
}


//delete