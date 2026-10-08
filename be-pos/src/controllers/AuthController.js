const USERS = [
    {
        name: "dp",
        email: "dp@gmail.com",
        password: "12345678"
    }
]

export const login = (req, res) => {

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
    const user = USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
        //401: unauthorize : login gagal
        return res.status(401).json({
            status: false,
            message: "PASSWORD SALAH DERRRR"
        });
    }

    res.status(200).json({
        status: true,
        message: "login succes",
        data: {
            user: {
                id: user.id,
                nama: user.name,
                email: user.email,
            },
            token: `jwt-token-123 ${user.id} - ${Date.now()}`
        }
    })
}