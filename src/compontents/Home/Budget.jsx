import React, { useState } from 'react';
import './Home.css'; // Ensure this file includes the necessary styles

const Budget = ({
    name,
    month,
    initialBudget,
    handleSetBudget,
    setName,
    setMonth,
    setInitialBudget
}) => {
    const [errors, setErrors] = useState({ name: '', month: '', initialBudget: '' });

    const validateInputs = () => {
        const newErrors = {
            name: name.trim().length < 2 ? 'Name must be at least 2 characters long' :
                  name.trim().length > 30 ? 'Name cannot exceed 30 characters' :
                  /^[0-9]+$/.test(name) ? 'Name should not contain numbers' : '',
            month: month === '' ? 'Month is required' : '',
            initialBudget: initialBudget.trim() === '' ? 'Initial Budget is required' :
                           isNaN(Number(initialBudget)) || Number(initialBudget) <= 0 ? 'Initial Budget must be a positive number' :
                           initialBudget.length < 2 ? 'Initial Budget must be at least 2 digits' :
                           initialBudget.length > 10 ? 'Initial Budget cannot exceed 10 digits' : ''
        };

        setErrors(newErrors);
        return !newErrors.name && !newErrors.month && !newErrors.initialBudget;
    };

    const handleClickSetBudget = () => {
        if (validateInputs()) {
            handleSetBudget();
        }
    };

    const handleInitialBudgetChange = (e) => {
        const value = e.target.value;
        // Allow only digits and empty string
        if (/^\d*\.?\d*$/.test(value) && value.length <= 10) {
            setInitialBudget(value);
            validateInputs(); // Validate on input change
        }
    };

    return (
        <div className="budget-container">
            <h3>Budget</h3>
            <input
                type="text"
                placeholder="Enter Name"
                
                value={name}
                minLength={2}
                maxLength={40}
                onChange={(e) => {
                    const value = e.target.value;
                    const filteredValue = value.replace(/[0-9]/g, '');
                    setName(filteredValue);
                    validateInputs(); // Validate on input change
                }}
                className={errors.name ? 'error-border' : ''}
                required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <input
                type="month"
                value={month}
                onChange={(e) => {
                    setMonth(e.target.value);
                    validateInputs(); // Validate on input change
                }}
                className={errors.month ? 'error-border' : ''}
                required
            />
            {errors.month && <p className="error-message">{errors.month}</p>}

            <div className="currency-input-container">
            <span className="currency-symbol">₹</span>
                <input
                    type="number"
                    placeholder="Set Budget"
                    value={initialBudget}
                    onChange={handleInitialBudgetChange}
                    className={errors.initialBudget ? 'error-border' : ''}
                    required
                />
               
            </div>
            {errors.initialBudget && <p className="error-message">{errors.initialBudget}</p>}

            <button
                onClick={handleClickSetBudget}
                disabled={Object.values(errors).some(error => error)}
            >
                Set Budget
            </button>
        </div>
    );
};

export default Budget;
