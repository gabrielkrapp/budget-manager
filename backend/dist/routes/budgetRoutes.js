"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigRoutes_1 = __importDefault(require("./ConfigRoutes"));
class BudgetRoutes extends ConfigRoutes_1.default {
    constructor() {
        super();
        this.router.get('/rows', this.getRows.bind(this));
        this.router.get('/rows/:id', this.getRowById.bind(this));
        this.router.post('/rows', this.postRow.bind(this));
        this.router.put('/rows/:id', this.putRow.bind(this));
        this.router.delete('/rows/:id', this.deleteRow.bind(this));
    }
    getRows(req, res) {
        const data = this.loadData();
        res.json(data.budgets);
    }
    getRowById(req, res) {
        const { id } = req.params;
        const data = this.loadData();
        const item = data.budgets.find((item) => item.id === parseInt(id, 10));
        if (item) {
            res.json(item);
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
    postRow(req, res) {
        const { category, price } = req.body;
        const data = this.loadData();
        const newItem = {
            id: data.budgets.length + 1,
            category,
            price
        };
        data.budgets.push(newItem);
        this.saveData(data);
        res.json(newItem);
    }
    putRow(req, res) {
        const { id } = req.params;
        const { category, price } = req.body;
        const data = this.loadData();
        const itemIndex = data.budgets.findIndex((item) => item.id === parseInt(id, 10));
        if (itemIndex > -1) {
            data.budgets[itemIndex].category = category;
            data.budgets[itemIndex].price = price;
            this.saveData(data);
            res.json(data.budgets[itemIndex]);
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
    deleteRow(req, res) {
        const { id } = req.params;
        const data = this.loadData();
        const itemIndex = data.budgets.findIndex((item) => item.id === parseInt(id, 10));
        if (itemIndex > -1) {
            const deletedItem = data.budgets.splice(itemIndex, 1);
            this.saveData(data);
            res.json(deletedItem[0]);
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
}
exports.default = new BudgetRoutes().router;
