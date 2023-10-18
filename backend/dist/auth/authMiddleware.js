"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../server");
function verifyToken(req, res, next) {
    const bearerHeader = req.header("Authorization");
    if (!bearerHeader)
        return res.status(401).send("Access Denied");
    const token = bearerHeader.split(" ")[1];
    try {
        const verified = jsonwebtoken_1.default.verify(token, server_1.SECRET_KEY);
        console.log("Verified token:", verified);
        req.user = verified;
        next();
    }
    catch (err) {
        console.error("Token verification error:", err);
        res.status(400).send("Invalid Token");
    }
}
exports.verifyToken = verifyToken;
