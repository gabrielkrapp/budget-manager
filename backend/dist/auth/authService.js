"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../server");
function generateToken(user, expiresIn = '1h') {
    return jsonwebtoken_1.default.sign({ userId: user.id }, server_1.SECRET_KEY, { expiresIn });
}
exports.generateToken = generateToken;
