"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
class ConfigRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.dataPath = path_1.default.join(__dirname, "..", "..", "database", "database.json");
    }
}
exports.default = ConfigRoutes;
