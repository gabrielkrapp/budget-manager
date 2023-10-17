import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import BudgetRoutes from './routes/BudgetRoutes';
import register from './routes/RegisterRouter';
import login from './routes/LoginRouter';
import crypto from 'crypto';

const app = express();
app.use(cors());
const PORT = 3001
app.use(bodyParser.json());

app.use(BudgetRoutes);
app.use(register);
app.use(login);

export const SECRET_KEY = crypto.randomBytes(32).toString('hex');

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
