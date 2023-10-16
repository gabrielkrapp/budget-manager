import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import budgetRoutes from './routes/budgetRoutes';
import register from './routes/register';
import login from './routes/login';

const app = express();
app.use(cors());
const PORT: number = 3001;
app.use(bodyParser.json());

app.use(budgetRoutes);
app.use(register);
app.use(login);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
