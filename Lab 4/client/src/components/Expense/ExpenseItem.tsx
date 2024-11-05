import {Expense} from "../../types/types";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
    // Exercise: Consume the AppContext here
    const {expenses, setExpenses} = useContext(AppContext);

    const handleDeleteExpense = async (currentExpense: Expense) => {
        try {
            // Call API function to delete from the backend
            await deleteExpense(currentExpense.id);

            // Remove the expense from the local context state
            setExpenses(expenses.filter(expense => expense.id !== currentExpense.id));
        } catch (error) {
            console.error("Failed to delete expense:", error);
        }
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>{currentExpense.description}</div>
            <div>${currentExpense.cost}</div>
            <div>
                <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
            </div>
        </li>
    );
};

export default ExpenseItem;
