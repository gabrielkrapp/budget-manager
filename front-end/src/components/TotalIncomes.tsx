import React, { useEffect, useState } from "react";

interface Income {
  price: number;
}

interface TotalIncomesProps {
  incomes: Income[];
}

const TotalIncomes: React.FC<TotalIncomesProps> = ({ incomes }) => {
  const [totalIncome, setTotalIncome] = useState<number>(0);

  useEffect(() => {
    const total = incomes.reduce(
      (acc, currentIncome) => acc + (currentIncome.price || 0),
      0,
    );
    setTotalIncome(total);
  }, [incomes]);

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md w-64 text-white mb-4">
      <p className="text-lg font-semibold">Total Income:</p>
      <p className="text-2xl text-green-500 font-bold">
        ${Number(totalIncome).toFixed(2)}
      </p>
    </div>
  );
};

export default TotalIncomes;
