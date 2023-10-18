import React from "react";

interface BalanceProps {
  incomes: number;
  expenses: number;
}

const Balance: React.FC<BalanceProps> = ({ incomes, expenses }) => {
  const balance = incomes - expenses;

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md w-64 text-white mb-4">
      <p className="text-lg font-semibold">Balance:</p>
      <p
        className={`text-2xl font-bold ${
          balance >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        ${balance.toFixed(2)}
      </p>
    </div>
  );
};

export default Balance;
