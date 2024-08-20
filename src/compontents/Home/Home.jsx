import React, { useState, useEffect } from 'react';
import PdfGenerator from './PdfGenerator';
import AddTransaction from './AddTransaction';
import './Home.css';
import subCategories from './subCategories.json';

const Home = () => {
    // State management
    const [name, setName] = useState('');
    const [month, setMonth] = useState('');
    const [initialBudget, setInitialBudget] = useState('');
    const [currentBudget, setCurrentBudget] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [transactionType, setTransactionType] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionName, setTransactionName] = useState('');
    const [subCategory, setSubCategory] = useState('');

    useEffect(() => {
        // Get the current date
        const now = new Date();
        // Format as YYYY-MM
        const currentMonthYear = now.toISOString().slice(0, 7);
        setMonth(currentMonthYear);
    }, []);

    const handleMonthChange = (e) => setMonth(e.target.value);

    // Helper function to retrieve subcategories based on expense type
    const getSubCategories = (type) => {
        return subCategories[type] || [];
    };

    // Event handler for setting the budget
    const handleSetBudget = () => {
        const budget = Number(initialBudget);
        if (!isNaN(budget)) {
            setCurrentBudget(budget);
        }
    };

    // Event handler for resetting the form
    const handleReset = () => {
        setName('');
        setMonth('');
        setInitialBudget('');
        setCurrentBudget(null);
        setTransactions([]);
        setTransactionType('');
        setExpenseType('');
        setTransactionAmount('');
        setTransactionName('');
        setSubCategory('');
    };

    // Event handler for adding a transaction
    const handleAddTransaction = () => {
        const amount = Number(transactionAmount);
        const isExpense = transactionType === 'expense';

        // Calculate new budget
        const newBudget = isExpense ? currentBudget - amount : currentBudget + amount;

        // Create new transaction object
        const newTransaction = {
            type: transactionType,
            expenseType: isExpense ? expenseType : 'income',
            amount,
            name: transactionName,
        };

        // Update transactions and current budget
        setTransactions([...transactions, newTransaction]);
        setCurrentBudget(newBudget);

        // Reset transaction input fields
        setTransactionAmount('');
        setTransactionName('');
    };

    return (
        <div className="main-container">
            <div className="home-container">
                <div className="home-header">
                    {currentBudget !== null && (
                        <h4 className='total-amt'>
                            <span className='name-style'>{name}</span> Total for this month is:
                            <span className='budget-style'>₹{currentBudget}</span>
                        </h4>
                    )}
                </div>
            </div>
            <div className='main-budget'>
                <div className="budget-container">
                    <h3>Budget</h3>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => {
                            const value = e.target.value;
                            const filteredValue = value.replace(/[0-9]/g, '');
                            setName(filteredValue);
                        }}
                    />

                    <label>
                        Enter Budget Month
                    </label>
                    <input
                        type="month"
                        value={month}
                        onChange={handleMonthChange}
                    />
                    <input
                        type="number"
                        placeholder="Set Budget"
                        value={initialBudget}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 10) {
                                setInitialBudget(value);
                            }
                        }}
                    />

                    <button
                        onClick={handleSetBudget}
                        disabled={!name || !month || !initialBudget}
                    >
                        Set Budget
                    </button>
                    <button onClick={handleReset}>Reset</button>
                </div>

                <AddTransaction
                    transactionType={transactionType}
                    setTransactionType={setTransactionType}
                    expenseType={expenseType}
                    setExpenseType={setExpenseType}
                    subCategory={subCategory}
                    setSubCategory={setSubCategory}
                    transactionAmount={transactionAmount}
                    setTransactionAmount={setTransactionAmount}
                    transactionName={transactionName}
                    setTransactionName={setTransactionName}
                    handleAddTransaction={handleAddTransaction}
                    getSubCategories={getSubCategories}
                    disabled={currentBudget === null}
                />
                <div className="transaction-container">
                    <h3>Transaction History</h3>
                    <ul>
                        {transactions.map((transaction, index) => (
                            <li key={index} className={transaction.type === 'expense' ? 'transaction-expense' : 'transaction-income'}>
                                {transaction.name} - {transaction.expenseType}: ₹{transaction.amount} ({transaction.type})
                            </li>
                        ))}
                    </ul>
                    {transactions.length > 0 && (
                        <PdfGenerator
                            name={name}
                            month={month}
                            initialBudget={initialBudget}
                            currentBudget={currentBudget}
                            transactions={transactions}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
