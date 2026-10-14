import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import pool from "../config/db.js";
const USERS = [
    {
        name: "dp",
        email: "dp@gmail.com",
        password: "12345678"
    }
]

export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        //400: bad response (broser)
        //500: server eror (server)
        //200: succes (berhasil)
        res.status(400).json({
            status: false,
            message: "email atay password required"
        });
    }

    //find()
    // const user = USERS.find((u) => u.email === email && u.password === password);
    const [user] = await pool.query("SELECT id, name, email, password FROM users WHERE email= ?", [email]);
    //email unik

    if (user.length === 0) {
        return res.status(401).json({
            status: false,
            message: "invalid credential",
        });
    }

    const dataUser = user[0]
    const isMatch = await bcrypt.compare(password, dataUser.password)

    if (!isMatch) {
        //401: unauthorize : login gagal
        return res.status(401).json({
            status: false,
            message: "PASSWORD SALAH DERRRR"
        });
    }

    const token = jwt.sign({
        id: dataUser.id,
        nama: dataUser.name,
        email: dataUser.email,

    },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
    );

    res.status(200).json({
        status: true,
        message: "login succes",
        data: {
            user: {
                id: dataUser.id,
                nama: dataUser.name,
                email: dataUser.email,
            },
            token,
        }
    })
}