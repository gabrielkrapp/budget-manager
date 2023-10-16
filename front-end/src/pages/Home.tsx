import { useEffect, useState } from "react";
import BudgetTable from "../components/BudgetTable";
import { BasicModal } from "../components/Modal";
import { fetchBudgetItems, updateBudgetItem, addBudgetItem, deleteBudgetItem } from '../api/BudgetApi';

interface BudgetItem {
    id: number;
    category: string;
    price: number;
  }
  

const Home = () => {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingCategory, setEditingCategory] = useState<string>('');
    const [editingPrice, setEditingPrice] = useState<number>(0);
  
    // EXIBE TODOS OS ITENS
    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await fetchBudgetItems();
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
      setEditingCategory('');
      setEditingPrice(0);
    };

    return (
        <div className="p-8 bg-slate-60">
          <BudgetTable items={budgetItems} removeRow={removeRow} handleOpenModal={handleOpenModal} />
          <button 
            onClick={() => handleOpenModal()} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          >
            Add
          </button> 
          <BasicModal 
            open={open} 
            handleClose={handleClose} 
            handleSave={addOrEditRow} 
            category={editingCategory}
            setCategory={setEditingCategory}
            price={editingPrice}
            setPrice={setEditingPrice}
          />
        </div>
    );
}

export default Home