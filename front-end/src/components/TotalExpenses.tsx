import React, { useEffect, useState } from "react";

interface Expense {
  price: number;
}

interface TotalExpensesProps {
  expenses: Expense[];
}

const TotalExpenses: React.FC<TotalExpensesProps> = ({ expenses }) => {
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    const total = expenses.reduce(
      (acc, currentExpense) => acc + (currentExpense.price || 0),
      0,
    );
    setTotalExpense(total);
  }, [expenses]);

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md w-64 text-white mb-4">
      <p className="text-lg font-semibold">Total Expenses:</p>
      <p className="text-2xl text-red-500 font-bold">
        ${Number(totalExpense).toFixed(2)}
      </p>
    </div>
  );
};

export default TotalExpenses;
