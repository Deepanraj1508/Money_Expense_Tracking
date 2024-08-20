import React, { useState } from 'react';

const AddTransaction = ({
    transactionType, setTransactionType,
    expenseType, setExpenseType,
    subCategory, setSubCategory,
    transactionAmount, setTransactionAmount,
    transactionName, setTransactionName,
    handleAddTransaction, getSubCategories, disabled
}) => {
    const [errors, setErrors] = useState({});
    const [otherExpenseDescription, setOtherExpenseDescription] = useState('');

    const validateFields = () => {
        const newErrors = {};
        if (!transactionType) newErrors.transactionType = true;
        if (transactionType === 'expense' && !expenseType) newErrors.expenseType = true;
        if (transactionType === 'expense' && expenseType === 'other' && !otherExpenseDescription) newErrors.otherExpenseDescription = true;
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
        setOtherExpenseDescription('');
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
                    setOtherExpenseDescription('');
                }}
            >
                <option value="none">Select Transaction Type</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            {errors.transactionType}

            {transactionType === 'expense' && (
                <select
                    name="expense-type"
                    id="expense-type"
                    className={errors.expenseType ? 'error-border' : ''}
                    value={expenseType}
                    onChange={(e) => {
                        setExpenseType(e.target.value);
                        setSubCategory('');
                        setOtherExpenseDescription('');
                    }}
                >
                    <option value="">Select Expense Type</option>
                    <option value="housing">Housing</option>
                    <option value="emi">EMI</option>
                    <option value="transportation">Transportation</option>
                    <option value="food">Food</option>
                    <option value="personal">Personal</option>
                    <option value="savings">Savings and Financial Goals</option>
                    <option value="other">Other</option>
                </select>
            )}
            {errors.expenseType}

            {expenseType && expenseType !== 'other' && (
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

            {expenseType === 'other' && (
                <input
                    type="text"
                    placeholder="Other Expense Description"
                    className={errors.otherExpenseDescription ? 'error-border' : ''}
                    value={otherExpenseDescription}
                    onChange={(e) => setOtherExpenseDescription(e.target.value)}
                />
            )}
            {errors.otherExpenseDescription}

            <input
                type="number"
                placeholder="Transaction Amount"
                className={errors.transactionAmount ? 'error-border' : ''}
                value={transactionAmount}
                onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                        setTransactionAmount(value);
                    }
                }}
            />
            {errors.transactionAmount}

            <input
                type="text"
                placeholder="Transaction Name"
                value={transactionName}
                onChange={(e) => setTransactionName(e.target.value)}
            />
            {errors.transactionName}

            <button onClick={handleClick} disabled={disabled}>
                Add Transaction
            </button>
        </div>
    );
};

export default AddTransaction;
