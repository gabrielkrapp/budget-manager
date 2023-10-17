import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  handleClose: () => void;
  handleSave: () => void;
  open: boolean;
  transactionType: 'Income' | 'Expense';
  setTransactionType: (value: 'Income' | 'Expense') => void;
  price: number;
  setPrice: (value: number) => void;
  setDescription: (value: string) => void;
  description: string;
}

export const BasicModal: React.FC<ModalProps> = ({ 
    open, handleClose, handleSave, transactionType, setTransactionType, price, setPrice, description, setDescription 
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="transactionType">
                    Transaction Type
                </label>
                <select 
                    id="transactionType"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value as 'Income' | 'Expense')}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="price">
                    Price
                </label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button 
                onClick={() => {
                    handleSave();
                    handleClose();
                }}
                type="submit" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
            </button>
        </Box>
      </Modal>
    </div>
  );
}
