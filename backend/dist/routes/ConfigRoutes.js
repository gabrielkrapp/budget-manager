"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ConfigRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.dataPath = path_1.default.join(__dirname, '..', '..', 'database', 'database.json');
    }
    loadData() {
        const rawData = fs_1.default.readFileSync(this.dataPath, 'utf-8');
        return JSON.parse(rawData);
    }
    saveData(data) {
        fs_1.default.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
    }
}
exports.default = ConfigRoutes;
