const pool = require("../config/db");
const bcrypt = require("bcrypt");
const generateTokens = require("../utils/generateTokens");

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

        if (existingUser.rows.length > 0) {

            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *", [name, email, hashedPassword]);

        const token = generateTokens(newUser.rows[0]);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser.rows[0].id,
                name: newUser.rows[0].name,
                email: newUser.rows[0].email
            }

        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const login = async (req, res)=>{

    try{

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token=generateTokens(user.rows[0]);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                email: user.rows[0].email
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports={register,login}