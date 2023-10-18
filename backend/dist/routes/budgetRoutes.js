"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigRoutes_1 = __importDefault(require("./ConfigRoutes"));
const databse_1 = require("../database/databse");
class BudgetRoutes extends ConfigRoutes_1.default {
    constructor() {
        super();
        this.router.get("/rows", this.getRowsByUserId.bind(this));
        this.router.post("/rows", this.postRow.bind(this));
        this.router.put("/rows/:id", this.putRow.bind(this));
        this.router.delete("/rows/:id", this.deleteRow.bind(this));
    }
    async getRowsByUserId(req, res) {
        const { userid } = req.query;
        try {
            const client = await databse_1.pool.connect();
            const query = "SELECT * FROM budgets WHERE userid = $1";
            const { rows } = await client.query(query, [userid]);
            client.release();
            res.json(rows);
        }
        catch (error) {
            console.error("Error retrieving rows from the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async postRow(req, res) {
        const { userid, category, description, price } = req.body;
        try {
            const client = await databse_1.pool.connect();
            const query = "INSERT INTO budgets (userId, category, description, price) VALUES ($1, $2, $3, $4) RETURNING *";
            const { rows } = await client.query(query, [
                userid,
                category,
                description,
                price,
            ]);
            client.release();
            res.json(rows[0]);
        }
        catch (error) {
            console.error("Error inserting row into the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async putRow(req, res) {
        const { id } = req.params;
        const { category, description, price } = req.body;
        try {
            const client = await databse_1.pool.connect();
            const query = "UPDATE budgets SET category = $1, description = $2, price = $3 WHERE id = $4 RETURNING *";
            const { rows } = await client.query(query, [
                category,
                description,
                price,
                id,
            ]);
            if (rows.length > 0) {
                const updatedItem = rows[0];
                client.release();
                res.json(updatedItem);
            }
            else {
                client.release();
                res.status(404).json({ error: "Item not found" });
            }
        }
        catch (error) {
            console.error("Error updating row in the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async deleteRow(req, res) {
        const { id } = req.params;
        try {
            const client = await databse_1.pool.connect();
            const query = "DELETE FROM budgets WHERE id = $1 RETURNING *";
            const { rows } = await client.query(query, [id]);
            if (rows.length > 0) {
                const deletedItem = rows[0];
                client.release();
                res.json(deletedItem);
            }
            else {
                client.release();
                res.status(404).json({ error: "Item not found" });
            }
        }
        catch (error) {
            console.error("Error deleting row from the database:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
exports.default = new BudgetRoutes().router;
