import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT: number = 3001;

app.use(bodyParser.json());

interface BudgetItem {
  id: number;
  category: string;
  price: number;
}

let budgetItems: BudgetItem[] = [
  { id: 1, category: 'Alimentação', price: 200 },
  { id: 2, category: 'Transporte', price: 100 },
];

let currentId = 3;

app.get('/rows', (req: Request, res: Response) => {
  res.json(budgetItems);
});

app.post('/rows', (req: Request, res: Response) => {
  const { category, price }: { category: string; price: number } = req.body;

  const newItem: BudgetItem = {
    id: currentId++,
    category,
    price
  };

  budgetItems.push(newItem);
  res.json(newItem);
});

app.put('/rows/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { category, price } = req.body;

  const itemIndex = budgetItems.findIndex(item => item.id === parseInt(id, 10));

  if (itemIndex > -1) {
    budgetItems[itemIndex].category = category;
    budgetItems[itemIndex].price = price;
    res.json(budgetItems[itemIndex]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.delete('/rows/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const itemIndex = budgetItems.findIndex(item => item.id === parseInt(id, 10));

  if (itemIndex > -1) {
    const deletedItem = budgetItems.splice(itemIndex, 1);
    res.json(deletedItem[0]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
