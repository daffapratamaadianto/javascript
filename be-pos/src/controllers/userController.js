import pool from "../config/db.js"

const USERS = [
    {
        id: 1,
        name: "dp",
        email: "dp@gmail.com",
        password: "12345678"
    },
    {
        id: 2,
        name: "daffa",
        email: "daffa@gmail.com",
        password: "12345678"
    },
    {
        id: 3,
        name: "dpa",
        email: "dpa@gmail.com",
        password: "12345678"
    },
]

// Crud


//read
export const getAllUser = async (req, res) => {

    try {

        const [rows] = await pool.query("SELECT id, email, is_active FROM users");
        return res.status(200).json({
            status: true,
            massage: "fetch user Succes",
            total: rows.length,
            data: rows,
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            massage: "fail fetch user",
            error: error.message
        })
    }


}

export const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        //find
        const user = await pool.query("SELECT id, email, is_active FROM users WHERE id=?",
            [id]);
        if (!user) {
            res.status(404).json({
                status: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            status: true,
            message: "User found",
            data: user,
        });
    } catch (error) {

        return res.status(500).json({
            status: false,
            massage: "fail connection users",
            error: error.message
        })
    }


}

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const [user] = await pool.query("INSERT INTO users(name,email,password) VALUES(?,?,?)", [name, email, password]);

        // const newUser = {
        //     id: USERS.length > 0 ? USERS[USERS.length - 1].id + 1 : 1,
        //     name,
        //     email,
        //     password,
        // }

        // USERS.push(newUser);

        return res.status(201).json({
            status: true,
            message: 'create user succes',
            data: { id: user.insertId, name, email },
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'create user  not succes',
            error: error.message,
        })
    }
}

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;

    try {
        const [user] = await pool.query("UPDATE users SET nama=?, email=?, password=? WHERE id=?", [name, email, password, id]);
        return res.status(200).json({
            status: true,
            message: 'update user success',
            data: USERS[userIndex],
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'gagal',
            error: error.message,
        })

    }


    const userIndex = USERS.findIndex((u) => u.id === id)
    USERS[userIndex] = {
        ...USERS[userIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
    }

}

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    // const userIndex = USERS.findIndex((u) => u.id === id)

    try {
        const [user] = await pool.query("DELETE FROM users WHERE id=?", [id]);
        //   const deletedUser = USERS.splice(userIndex, 1)[0];
        return res.status(200).json({
            status: true,
            message: "delete user succes",
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'gagal delete',
            error: error.message,
        })

    }


    if (userIndex === -1) {
        return res.status(404).json({
            status: false,
            message: "User No found",
        })
    }

}

