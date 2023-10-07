import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface BudgetItem {
  id: number;
  category: string;
  price: number;
}

interface BudgetTableProps {
  items: BudgetItem[];
  removeRow: (index: number) => void
  handleOpenModal: (index: number) => void
}


const BudgetTable: React.FC<BudgetTableProps> = ({ items, removeRow, handleOpenModal }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
      <thead>
        <tr>
          <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Category
          </th>
          <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Price
          </th>
          <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
          </th>
          <th className="py-2 px-4 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="py-2 px-4">{item.category}</td>
            <td className="py-2 px-4">{item.price}</td>
            <td className="py-2 px-4">
              <button onClick={() => handleOpenModal(index)}><EditIcon /></button>
            </td>
            <td className="py-2 px-4">
              <button onClick={() => removeRow(index)}><DeleteIcon /></button>  
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BudgetTable;
