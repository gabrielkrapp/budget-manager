import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type TransactionType = "Income" | "Expense";

interface BudgetItem {
  id: number;
  category: TransactionType;
  description: string;
  price: number;
}

interface BudgetTableProps {
  items: BudgetItem[];
  removeRow: (index: number) => void;
  handleOpenModal: (index: number) => void;
}

const BudgetTable: React.FC<BudgetTableProps> = ({
  items,
  removeRow,
  handleOpenModal,
}) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
      <thead>
        <tr>
          <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Category
          </th>
          <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Description
          </th>
          <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Price
          </th>
          <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"></th>
          <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
          >
            <td className="py-2 px-4">
              <span
                className={`inline-block px-2 py-1 rounded ${
                  item.category === "Income"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {item.category}
              </span>
            </td>
            <td className="py-2 px-4">{item.description}</td>
            <td className="py-2 px-4">{item.price}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => handleOpenModal(index)}
                className="text-blue-500 hover:text-blue-700 transition duration-150"
              >
                <EditIcon />
              </button>
            </td>
            <td className="py-2 px-4">
              <button
                onClick={() => removeRow(index)}
                className="text-red-500 hover:text-red-700 transition duration-150"
              >
                <DeleteIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BudgetTable;
