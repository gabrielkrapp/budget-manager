"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigRoutes_1 = __importDefault(require("./ConfigRoutes"));
const authService_1 = require("../auth/authService");
const databse_1 = require("../database/databse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Login extends ConfigRoutes_1.default {
    constructor() {
        super();
        this.router.post("/login", this.loginUser.bind(this));
    }
    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const client = await databse_1.pool.connect();
            const query = "SELECT id FROM users WHERE email = $1 AND password = $2";
            const { rows } = await client.query(query, [email, password]);
            if (rows.length > 0) {
                const userid = rows[0].id;
                const token = (0, authService_1.generateToken)({ userid, email });
                console.log(jsonwebtoken_1.default.decode(token));
                client.release();
                res.json({ token });
            }
            else {
                client.release();
                res
                    .status(401)
                    .json({ status: "fail", message: "Invalid email or password" });
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
exports.default = new Login().router;
