"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
const dataPath = path_1.default.join(__dirname, '..', '..', 'database', 'database.json');
const loadData = () => {
    const rawData = fs_1.default.readFileSync(dataPath, 'utf-8');
    return JSON.parse(rawData);
};
const saveData = (data) => {
    fs_1.default.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};
router.get('/rows', (req, res) => {
    const data = loadData();
    res.json(data.budgets);
});
router.get('/rows/:id', (req, res) => {
    const { id } = req.params;
    const data = loadData();
    const item = data.budgets.find((item) => item.id === parseInt(id, 10));
    if (item) {
        res.json(item);
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
});
router.post('/rows', (req, res) => {
    const { category, price } = req.body;
    const data = loadData();
    const newItem = {
        id: data.budgets.length + 1,
        category,
        price
    };
    data.budgets.push(newItem);
    saveData(data);
    res.json(newItem);
});
router.put('/rows/:id', (req, res) => {
    const { id } = req.params;
    const { category, price } = req.body;
    const data = loadData();
    const itemIndex = data.budgets.findIndex((item) => item.id === parseInt(id, 10));
    if (itemIndex > -1) {
        data.budgets[itemIndex].category = category;
        data.budgets[itemIndex].price = price;
        saveData(data);
        res.json(data.budgets[itemIndex]);
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
});
router.delete('/rows/:id', (req, res) => {
    const { id } = req.params;
    const data = loadData();
    const itemIndex = data.budgets.findIndex((item) => item.id === parseInt(id, 10));
    if (itemIndex > -1) {
        const deletedItem = data.budgets.splice(itemIndex, 1);
        saveData(data);
        res.json(deletedItem[0]);
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
});
exports.default = router;
