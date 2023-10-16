"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigRoutes_1 = __importDefault(require("./ConfigRoutes"));
class Register extends ConfigRoutes_1.default {
    constructor() {
        super();
        this.router.post('/register', this.registerUser.bind(this));
    }
    registerUser(req, res) {
        const { name, email, password } = req.body;
        const data = this.loadData();
        const newItem = {
            id: data.users.length + 1,
            name,
            email,
            password
        };
        data.users.push(newItem);
        this.saveData(data);
        res.json(newItem);
    }
}
exports.default = new Register().router;
