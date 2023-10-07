import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();
const dataPath = path.join(__dirname, '..', '..', 'database', 'database.json');

const loadData = (): any => {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(rawData);
};

const saveData = (data: any) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

router.get('/rows', (req: Request, res: Response) => {
    const data = loadData();
    res.json(data.budgets);
});

router.get('/rows/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const data = loadData();
    const item = data.budgets.find((item: any) => item.id === parseInt(id, 10));
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

router.post('/rows', (req: Request, res: Response) => {
    const { category, price }: { category: string; price: number } = req.body;

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

router.put('/rows/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { category, price } = req.body;

    const data = loadData();
    const itemIndex = data.budgets.findIndex((item: any) => item.id === parseInt(id, 10));

    if (itemIndex > -1) {
        data.budgets[itemIndex].category = category;
        data.budgets[itemIndex].price = price;
        saveData(data);
        res.json(data.budgets[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

router.delete('/rows/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    const data = loadData();
    const itemIndex = data.budgets.findIndex((item: any) => item.id === parseInt(id, 10));

    if (itemIndex > -1) {
        const deletedItem = data.budgets.splice(itemIndex, 1);
        saveData(data);
        res.json(deletedItem[0]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

export default router;
