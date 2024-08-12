import React, { useState } from 'react';

const AddTransaction = ({
    transactionType, setTransactionType,
    expenseType, setExpenseType,
    subCategory, setSubCategory,
    transactionAmount, setTransactionAmount,
    transactionName, setTransactionName,
    handleAddTransaction, getSubCategories
}) => {
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (!transactionType) newErrors.transactionType = true;
        if (transactionType === 'expense' && !expenseType) newErrors.expenseType = true;
        if (!transactionAmount || isNaN(transactionAmount) || transactionAmount <= 0) newErrors.transactionAmount = true;
        if (!transactionName || !/^[a-zA-Z\s]+$/.test(transactionName)) newErrors.transactionName = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetFields = () => {
        setTransactionType('');
        setExpenseType('');
        setSubCategory('');
        setTransactionAmount('');
        setTransactionName('');
    };

    const handleClick = () => {
        if (validateFields()) {
            handleAddTransaction();
            resetFields(); // Clear all input fields
        }
    };

    return (
        <div className="add-transaction-container">
            <h3>Add Transaction</h3>
            <select
                name="transaction-type"
                id="transaction-type"
                className={errors.transactionType ? 'error-border' : ''}
                value={transactionType}
                onChange={(e) => {
                    setTransactionType(e.target.value);
                    setExpenseType('');
                    setSubCategory('');
                }}
            >
                <option value="">Select Transaction Type</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>

            {transactionType === 'expense' && (
                <select
                    name="expense-type"
                    id="expense-type"
                    className={errors.expenseType ? 'error-border' : ''}
                    value={expenseType}
                    onChange={(e) => {
                        setExpenseType(e.target.value);
                        setSubCategory('');
                    }}
                >
                    <option value="">Select Expense Type</option>
                    <option value="housing">Housing</option>
                    <option value="emi">EMI</option>
                    <option value="transportation">Transportation</option>
                    <option value="food">Food</option>
                    <option value="personal">Personal</option>
                    <option value="savings">Savings and Financial Goals</option>
                </select>
            )}

            {expenseType && (
                <select
                    name="sub-category"
                    id="sub-category"
                    className={errors.subCategory ? 'error-border' : ''}
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                >
                    <option value="">Select Subcategory</option>
                    {getSubCategories(expenseType).map((sub) => (
                        <option key={sub.value} value={sub.value}>
                            {sub.label}
                        </option>
                    ))}
                </select>
            )}

            <input
                type="number"
                placeholder="Transaction Amount"
                className={errors.transactionAmount ? 'error-border' : ''}
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
            />
            
                <input
                type="text"
                placeholder="Transaction Name"
                className={errors.transactionName ? 'error-border' : ''}
                value={transactionName}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value)) { // Allow only letters and spaces
                        setTransactionName(value);
                    }
                }}
            />


            

            <button onClick={handleClick}>Add Transaction</button>
        </div>
    );
};

export default AddTransaction;
