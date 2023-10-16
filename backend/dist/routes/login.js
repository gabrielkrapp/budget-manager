"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigRoutes_1 = __importDefault(require("./ConfigRoutes"));
class Login extends ConfigRoutes_1.default {
    constructor() {
        super();
        this.router.post('/login', this.loginUser.bind(this));
    }
    loginUser(req, res) {
        const { email, password } = req.body;
        const data = this.loadData();
        const user = {
            email,
            password
        };
        const foundUser = data.users.find((user) => user.email === email && user.password === password);
        if (foundUser) {
            res.json("Login successful");
        }
        else {
            res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
        }
    }
}
exports.default = new Login().router;
