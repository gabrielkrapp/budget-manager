import React, { useEffect, useState } from "react";
import BudgetTable from "../components/BudgetTable";
import { BasicModal } from "../components/Modal";
import { fetchBudgetItems, updateBudgetItem, addBudgetItem, deleteBudgetItem } from '../api/BudgetApi';
import { useNavigate } from "react-router";
import Person2Icon from '@mui/icons-material/Person2';
import IncomeVsExpenseChart from "../components/Chart";

type TransactionType = "Income" | "Expense";

interface BudgetItem {
  id: number;
  category: TransactionType;
  description: string;
  price: number;
}
  

const Home = () => {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingCategory, setEditingCategory] = useState<TransactionType>('Expense');
    const [editingDescription, setEditingDescription] = useState<string>('');
    const [editingPrice, setEditingPrice] = useState<number>(0);
    const navigate = useNavigate();
  
    // EXIBE TODOS OS ITENS
    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await fetchBudgetItems(1);
                setBudgetItems(items);
            } catch (error) {
                console.error("There was an error fetching the rows", error);
            }
        };
    
        fetchData();
    }, []);

    // ADICIONA OU EDITA UMA LINHA
    const addOrEditRow = () => {
        const item = {
            category: editingCategory,
            description: editingDescription,
            price: editingPrice
        };
    
        if (editingIndex !== null) {
            const id = budgetItems[editingIndex].id;
            updateBudgetItem(id, item)
                .then(updatedItem => {
                    setBudgetItems(prev => prev.map((item, idx) => idx === editingIndex ? updatedItem : item));
                    handleClose();
                })
                .catch(error => console.error("Error updating the row", error));
        } else {
            addBudgetItem(item)
                .then(newItem => {
                    setBudgetItems(prev => [...prev, newItem]);
                    handleClose();
                })
                .catch(error => console.error("Error adding a new row", error));
        }
    };

    const removeRow = (index: number) => {
        const id = budgetItems[index].id;
        deleteBudgetItem(id)
            .then(() => {
                setBudgetItems(prev => prev.filter((_, idx) => idx !== index));
            })
            .catch(error => console.error("Error deleting the row", error));
    };

    const handleOpenModal = (index?: number) => {
        if (typeof index === 'number') {
          setEditingIndex(index);
          setEditingCategory(budgetItems[index].category);
          setEditingDescription(budgetItems[index].description);
          setEditingPrice(budgetItems[index].price);
        } else {
          resetEditingState();
        }
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      resetEditingState();
    };
  
    const resetEditingState = () => {
      setEditingIndex(null);
      setEditingCategory('Expense');
      setEditingDescription('')
      setEditingPrice(0);
    };

    const handleLogout = () => {
      localStorage.removeItem("authToken");
      navigate("/login");
    }

    const openMenu = () => {
      console.log("Menu opened!"); // TODO: Implementar a função
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-screen-xl mt-4 bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center">
            
            <div className="w-full text-right mb-4">
              <button onClick={openMenu} className="p-2 hover:bg-gray-200 rounded-full">
                <Person2Icon className="text-gray-500" />
              </button>
            </div>

            <div className="w-full md:w-3/4 bg-gray-200 p-4 rounded-lg mb-4 shadow-inner">
              <span className="text-gray-700 font-bold">
                <IncomeVsExpenseChart budgetItems={budgetItems}/>
              </span>
            </div>

            <div className="w-full md:w-3/4">
              <BudgetTable items={budgetItems} removeRow={removeRow} handleOpenModal={handleOpenModal} />
              <button 
                onClick={() => handleOpenModal()} 
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                +
              </button>
            </div>
        </div>

        <BasicModal 
            open={open} 
            handleClose={handleClose} 
            handleSave={addOrEditRow} 
            transactionType={editingCategory}
            setTransactionType={setEditingCategory}
            price={editingPrice}
            setPrice={setEditingPrice}
            setDescription={setEditingDescription}
            description={editingDescription}
        />
    </div>
  );
}

export default Home;
