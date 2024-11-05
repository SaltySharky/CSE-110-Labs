import React, {useContext, useState, useEffect} from "react";
import {AppContext} from "../../context/AppContext";
import {fetchBudget, updateBudget} from "../../utils/budget-utils";


const Budget = () => {
    const {budget, setBudget} = useContext(AppContext);
    const [inputBudget, setInputBudget] = useState<string>(budget.toString());


    useEffect(() => {
        loadBudget();
    }, []);


    const loadBudget = async () => {
        try {
            const fetchedBudget = await fetchBudget();
            setBudget(fetchedBudget);
            setInputBudget(fetchedBudget.toString());
        } catch (err: any) {
            console.log(err.message);
        }
    };


    const handleBudgetUpdate = (newBudget: string) => {
        setInputBudget(newBudget);
    };


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        try {
            const updatedBudget = await updateBudget(parseInt(inputBudget));
            setBudget(updatedBudget.amount);
        } catch (err: any) {
            console.error("Failed to update budget", err);
        }
    };


    return (
        <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
            <div>Budget: ${budget}</div>
            <form onSubmit={onSubmit} className="d-flex align-items-center">
                <input
                    required
                    className="form-control"
                    type="number"
                    id="budget"
                    value={inputBudget}
                    onChange={(e) => handleBudgetUpdate(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
};


export default Budget;