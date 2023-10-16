import { Request, Response } from 'express';
import ConfigRoutes from './ConfigRoutes';

class BudgetRoutes extends ConfigRoutes {
    constructor() {
        super()

        this.router.get('/rows', this.getRows.bind(this));
        this.router.get('/rows/:id', this.getRowById.bind(this));
        this.router.post('/rows', this.postRow.bind(this));
        this.router.put('/rows/:id', this.putRow.bind(this));
        this.router.delete('/rows/:id', this.deleteRow.bind(this));
    }

    private getRows(req: Request, res: Response): void {
        const data = this.loadData();
        res.json(data.budgets);
    }

    private getRowById(req: Request, res: Response): void {
        const { id } = req.params;
        const data = this.loadData();
        const item = data.budgets.find((item: any) => item.id === parseInt(id, 10));
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    }

    private postRow(req: Request, res: Response): void {
        const { category, price }: { category: string; price: number } = req.body;

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

    private putRow(req: Request, res: Response): void {
        const { id } = req.params;
        const { category, price } = req.body;

        const data = this.loadData();
        const itemIndex = data.budgets.findIndex((item: any) => item.id === parseInt(id, 10));

        if (itemIndex > -1) {
            data.budgets[itemIndex].category = category;
            data.budgets[itemIndex].price = price;
            this.saveData(data);
            res.json(data.budgets[itemIndex]);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    }

    private deleteRow(req: Request, res: Response): void {
        const { id } = req.params;

        const data = this.loadData();
        const itemIndex = data.budgets.findIndex((item: any) => item.id === parseInt(id, 10));

        if (itemIndex > -1) {
            const deletedItem = data.budgets.splice(itemIndex, 1);
            this.saveData(data);
            res.json(deletedItem[0]);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
}

export default new BudgetRoutes().router;