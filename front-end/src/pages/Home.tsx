import { useEffect, useState } from "react";
import BudgetTable from "../components/BudgetTable";
import { BasicModal } from "../components/Modal";
import {
  fetchBudgetItems,
  updateBudgetItem,
  addBudgetItem,
  deleteBudgetItem,
} from "../api/BudgetApi";
import { useNavigate } from "react-router";
import Person2Icon from "@mui/icons-material/Person2";
import IncomeVsExpenseChart from "../components/Chart";
import AccountMenu from "../components/AccountMenu";
import { getUserIdFromJwt } from "../utils/getUserIdFromJwt";
import TotalIncomes from "../components/TotalIncomes";
import TotalExpenses from "../components/TotalExpenses";
import Balance from "../components/Balance";

type TransactionType = "Income" | "Expense";

interface BudgetItem {
  id: number;
  category: TransactionType;
  description: string;
  price: number;
}

const Home = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<TransactionType>("Expense");
  const [editingDescription, setEditingDescription] = useState<string>("");
  const [editingPrice, setEditingPrice] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("authToken");
  const userId = getUserIdFromJwt(token!);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchBudgetItems(userId);
        setBudgetItems(items);
      } catch (error) {
        console.error("There was an error fetching the rows", error);
      }
    };

    fetchData();
  }, []);

  const addOrEditRow = () => {
    const item = {
      userid: userId,
      category: editingCategory,
      description: editingDescription,
      price: editingPrice,
    };

    if (editingIndex !== null) {
      const id = budgetItems[editingIndex].id;
      updateBudgetItem(id, item)
        .then((updatedItem) => {
          setBudgetItems((prev) =>
            prev.map((item, idx) =>
              idx === editingIndex ? updatedItem : item,
            ),
          );
          handleCloseModal();
        })
        .catch((error) => console.error("Error updating the row", error));
    } else {
      addBudgetItem(item)
        .then((newItem) => {
          setBudgetItems((prev) => [...prev, newItem]);
          handleCloseModal();
        })
        .catch((error) => console.error("Error adding a new row", error));
    }
  };

  const removeRow = (index: number) => {
    const id = budgetItems[index].id;
    deleteBudgetItem(id)
      .then(() => {
        setBudgetItems((prev) => prev.filter((_, idx) => idx !== index));
      })
      .catch((error) => console.error("Error deleting the row", error));
  };

  const handleOpenModal = (index?: number) => {
    if (typeof index === "number") {
      setEditingIndex(index);
      setEditingCategory(budgetItems[index].category);
      setEditingDescription(budgetItems[index].description);
      setEditingPrice(budgetItems[index].price);
    } else {
      resetEditingState();
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetEditingState();
  };

  const resetEditingState = () => {
    setEditingIndex(null);
    setEditingCategory("Expense");
    setEditingDescription("");
    setEditingPrice(0);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleOpenAccountMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenAccountMenu(true);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
    setOpenAccountMenu(false);
  };

  return (
    <div className="flex flex-col p-8 bg-gray-100 min-h-screen items-center">
      <div className="w-full max-w-screen-xl mt-4 bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center">
        <div className="w-full text-right mb-4">
          <button
            onClick={handleOpenAccountMenu}
            className="p-2 hover:bg-gray-200 rounded-full min-w-[40px] min-h-[40px]"
          >
            <Person2Icon className="text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row w-full md:w-3/4 justify-between mb-4 space-y-4 md:space-y-0">
          <div className="flex-1">
              <TotalIncomes
                  incomes={budgetItems.filter((item) => item.category === "Income")}
              />
          </div>
          <div className="flex-1">
              <TotalExpenses
                  expenses={budgetItems.filter((item) => item.category === "Expense")}
              />
          </div>
          <div className="flex-1">
              <Balance
                  incomes={budgetItems
                    .filter((item) => item.category === "Income")
                    .reduce((acc, curr) => acc + curr.price, 0)}
                  expenses={budgetItems
                    .filter((item) => item.category === "Expense")
                    .reduce((acc, curr) => acc + curr.price, 0)}
              />
          </div>
        </div>


        <div className="w-full md:w-3/4 bg-gray-200 p-4 rounded-lg mb-4 shadow-inner">
          <span className="text-gray-700 font-bold">
            <IncomeVsExpenseChart budgetItems={budgetItems} />
          </span>
        </div>

        <div className="w-full md:w-3/4">
          <BudgetTable
            items={budgetItems}
            removeRow={removeRow}
            handleOpenModal={handleOpenModal}
          />
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow w-full md:w-auto"
          >
            +
          </button>
        </div>
      </div>

      <BasicModal
        openModal={openModal}
        handleClose={handleCloseModal}
        handleSave={addOrEditRow}
        transactionType={editingCategory}
        setTransactionType={setEditingCategory}
        price={editingPrice}
        setPrice={setEditingPrice}
        setDescription={setEditingDescription}
        description={editingDescription}
        isEditing={editingIndex !== null}
      />

      <AccountMenu
        handleCloseAccountMenu={handleCloseAccountMenu}
        openAccountMenu={openAccountMenu}
        handleLogout={handleLogout}
        anchorEl={anchorEl}
      />
    </div>
  );
};

export default Home;