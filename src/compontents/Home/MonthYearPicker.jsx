import React, { useState } from 'react';

const MonthYearPicker = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);

    return (
        <div>
            <label>
                Month
                <select value={month} onChange={handleMonthChange}>
                    <option value="">Select Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </label>
            <label>
                Year
                <input
                    type="number"
                    min="1900"
                    max="2099"
                    value={year}
                    onChange={handleYearChange}
                />
            </label>
            <p>
                Selected Date: {month}/{year}
            </p>
        </div>
    );
};

export default MonthYearPicker;
