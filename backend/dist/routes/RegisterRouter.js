"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigRoutes_1 = __importDefault(require("./ConfigRoutes"));
const databse_1 = require("../database/databse");
class Register extends ConfigRoutes_1.default {
    constructor() {
        super();
        this.router.post('/register', this.registerUser.bind(this));
    }
    async registerUser(req, res) {
        const { name, email, password } = req.body;
        try {
            const client = await databse_1.pool.connect();
            const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
            const { rows } = await client.query(query, [name, email, password]);
            client.release();
            res.json(rows[0]);
        }
        catch (error) {
            console.error('Error registering user into the database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.default = new Register().router;
