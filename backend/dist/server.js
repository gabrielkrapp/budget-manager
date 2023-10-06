"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = 3001;
app.use(body_parser_1.default.json());
let budgetItems = [
    { id: 1, category: 'Alimentação', price: 200 },
    { id: 2, category: 'Transporte', price: 100 },
];
let currentId = 3;
app.get('/rows', (req, res) => {
    res.json(budgetItems);
});
app.post('/rows', (req, res) => {
    const { category, price } = req.body;
    const newItem = {
        id: currentId++,
        category,
        price
    };
    budgetItems.push(newItem);
    res.json(newItem);
});
app.put('/rows/:id', (req, res) => {
    const { id } = req.params;
    const { category, price } = req.body;
    const itemIndex = budgetItems.findIndex(item => item.id === parseInt(id, 10));
    if (itemIndex > -1) {
        budgetItems[itemIndex].category = category;
        budgetItems[itemIndex].price = price;
        res.json(budgetItems[itemIndex]);
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
});
app.delete('/rows/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = budgetItems.findIndex(item => item.id === parseInt(id, 10));
    if (itemIndex > -1) {
        const deletedItem = budgetItems.splice(itemIndex, 1);
        res.json(deletedItem[0]);
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
