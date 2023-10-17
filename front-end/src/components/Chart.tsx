import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

type TransactionType = "Income" | "Expense";

interface BudgetItem {
  id: number;
  category: TransactionType;
  description: string;
  price: number;
}

interface Props {
  budgetItems: BudgetItem[];
}

const IncomeVsExpensesChart: React.FC<Props> = ({ budgetItems }) => {

  const roundToTwoDecimals = (value: any) => {
    return Math.round(parseFloat(value) * 100) / 100; // Arredonda para duas casas decimais
  };
  
  const totalIncome = budgetItems
    .filter(item => item.category === 'Income')
    .reduce((acc, item) => acc + roundToTwoDecimals(item.price), 0);
  
  const totalExpenses = budgetItems
    .filter(item => item.category === 'Expense')
    .reduce((acc, item) => acc + roundToTwoDecimals(item.price), 0);
  
  const chartData = [
    { name: 'Income', value: totalIncome.toString() },
    { name: 'Expenses', value: totalExpenses.toString() }
  ];

  return (
    <BarChart width={600} height={300} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#f5f5f5" />
      <Bar dataKey="value" barSize={20} fill="#413ea0" />
    </BarChart>
  );
}

export default IncomeVsExpensesChart;
