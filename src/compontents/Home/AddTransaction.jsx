import React, { useState } from 'react';
import './Home.css'; // Assuming you will add the styles here

const AddTransaction = ({
    transactionType,
    setTransactionType,
    expenseType,
    setExpenseType,
    subCategory,
    setSubCategory,
    transactionAmount,
    setTransactionAmount,
    transactionName,
    setTransactionName,
    handleAddTransaction,
    getSubCategories,
    disabled
}) => {
    const [errors, setErrors] = useState({});
    const [otherExpenseDescription, setOtherExpenseDescription] = useState('');

    const validateFields = () => {
        const newErrors = {};
        if (!transactionType) newErrors.transactionType = 'Transaction type is required.';
        if (transactionType === 'expense' && !expenseType) newErrors.expenseType = 'Expense type is required.';
        if (transactionType === 'expense' && expenseType === 'other' && !otherExpenseDescription) newErrors.otherExpenseDescription = 'Description for "Other" expense is required.';
        if (!transactionAmount || isNaN(transactionAmount) || transactionAmount <= 0) newErrors.transactionAmount = 'Valid transaction amount is required.';
        if (!transactionName || !/^[a-zA-Z\s]+$/.test(transactionName)) newErrors.transactionName = 'Valid transaction name is required.';
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

    const handleTransactionAmountChange = (e) => {
        const value = e.target.value;
        // Allow only digits and empty string
        if (/^\d*$/.test(value)) {
            setTransactionAmount(value);
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
                <option value="">Select Transaction Type</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            {errors.transactionType && <div className="error-message">{errors.transactionType}</div>}

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
            {errors.expenseType && <div className="error-message">{errors.expenseType}</div>}

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
            {errors.otherExpenseDescription && <div className="error-message">{errors.otherExpenseDescription}</div>}
            <div className="currency-input-container">
            <span className="currency-symbol">₹</span>
            <input
                type="number"
                placeholder="Transaction Amount"
                onChange={handleTransactionAmountChange}
                className={errors.transactionAmount ? 'error-border' : ''}
                value={transactionAmount}
            />
            </div>
            {errors.transactionAmount && <div className="error-message">{errors.transactionAmount}</div>}

            <input
                type="text"
                placeholder="Transaction Name"
                value={transactionName}
                onChange={(e) => setTransactionName(e.target.value)}
                className={errors.transactionName ? 'error-border' : ''}
            />
            {errors.transactionName && <div className="error-message">{errors.transactionName}</div>}

            <button onClick={handleClick} disabled={disabled}>
                Add Transaction
            </button>
        </div>
    );
};

export default AddTransaction;
