import React, { useState } from 'react';
import PdfGenerator from './PdfGenerator';
import AddTransaction from './AddTransaction';
import './Home.css';

const Home = () => {
    // State management
    const [name, setName] = useState('');
    const [month, setMonth] = useState('');
    const [initialBudget, setInitialBudget] = useState();
    const [currentBudget, setCurrentBudget] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [transactionType, setTransactionType] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const [transactionAmount, setTransactionAmount] = useState();
    const [transactionName, setTransactionName] = useState('');
    const [subCategory, setSubCategory] = useState('');

    const getSubCategories = (type) => {
        const subCategories = {
            housing: [
                { value: 'rent', label: 'Home Rent' },
                { value: 'electricity', label: 'Electricity' },
                { value: 'gas', label: 'Gas' },
                { value: 'water', label: 'Water' },
                { value: 'internet_cable', label: 'Internet and Cable/Streaming Services' }
            ],
            emi: [
                { value: 'bike', label: 'Bike' },
                { value: 'car', label: 'Car' },
                { value: 'mobile', label: 'Mobile' },
                { value: 'homeloan', label: 'Home loans' },
                { value: 'credit_card_payments', label: 'Credit Card Payments' },
                { value: 'student_loans', label: 'Student Loan Payments' },
                { value: 'other_loans', label: 'Other Loan Payments' }
            ],
            transportation: [
                { value: 'petrol', label: 'Petrol/Diesel' },
                { value: 'public_transportation', label: 'Public Transportation Fares' },
                { value: 'vehicle_maintenance', label: 'Vehicle Maintenance' }
            ],
            food: [
                { value: 'groceries', label: 'Groceries' },
                { value: 'dining_out', label: 'Dining Out' }
            ],
            personal: [
                { value: 'clothing', label: 'Clothing' },
                { value: 'personal_care', label: 'Personal Care' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'cell_phone', label: 'Cell Phone' },
                { value: 'subscriptions', label: 'Subscriptions' }
            ],
            savings: [
                { value: 'retirement_contributions', label: 'Retirement Contributions' },
                { value: 'emergency_fund', label: 'Emergency Fund Savings' },
                { value: 'other_savings', label: 'Other Savings Goals' }
            ],
            other:[
                {value: 'other',label:'other'}
            ]
        };
        return subCategories[type] || [];
    };

    // Event handler for setting the budget
    const handleSetBudget = () => {
        setCurrentBudget(Number(initialBudget));
    };

    // Event handler for resetting the form
    const handleReset = () => {
        setName('');
        setMonth('');
        setInitialBudget();
        setCurrentBudget(null);
        setTransactions([]);
        setTransactionType('expense');
        setExpenseType('');
        setTransactionAmount();
        setTransactionName('');
        setSubCategory('');
    };

    // Event handler for adding a transaction
    const handleAddTransaction = () => {
        const amount = Number(transactionAmount);
        const isExpense = transactionType === 'expense';

        // Calculate new budget
        const newBudget = isExpense ? currentBudget - amount : currentBudget + amount;

        // Add the transaction and update the budget
        const newTransaction = {
            type: transactionType,
            expenseType: isExpense ? expenseType : 'income',
            amount,
            name: transactionName,
        };

        setTransactions([...transactions, newTransaction]);
        setCurrentBudget(newBudget);
        setTransactionAmount();
        setTransactionName('');
    };

    return (
        <div className="main-container">
            <div className="home-container">
                <div className="home-header">
                    {currentBudget !== null && (
                        <h4 className='total-amt'>{name} total for this month is: ₹{currentBudget}</h4>
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
                            // Use a regular expression to remove numeric characters
                            const filteredValue = value.replace(/[0-9]/g, '');
                            setName(filteredValue);
                        }}
                    />

                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
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

                    <button onClick={handleSetBudget}>Set Budget</button>
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
                />
                <div className="transaction-container">
                    <h3>Transactions History</h3>
                    <ul>
                        {transactions.map((transaction, index) => {
                            // Determine class based on transaction type
                            const className = transaction.type === 'expense' ? 'transaction-expense' : 'transaction-income';

                            return (
                                <li key={index} className={className}>
                                    {transaction.name} - {transaction.expenseType}: ₹{transaction.amount} ({transaction.type})
                                </li>
                            );
                        })}
                    </ul>
                    <PdfGenerator
                        name={name}
                        month={month}
                        initialBudget={initialBudget}
                        currentBudget={currentBudget}
                        transactions={transactions}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
