"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const BudgetRoutes_1 = __importDefault(require("./routes/BudgetRoutes"));
const RegisterRouter_1 = __importDefault(require("./routes/RegisterRouter"));
const LoginRouter_1 = __importDefault(require("./routes/LoginRouter"));
const crypto_1 = __importDefault(require("crypto"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = 3001;
app.use(body_parser_1.default.json());
app.use(BudgetRoutes_1.default);
app.use(RegisterRouter_1.default);
app.use(LoginRouter_1.default);
exports.SECRET_KEY = crypto_1.default.randomBytes(32).toString('hex');
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
