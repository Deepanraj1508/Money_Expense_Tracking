import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PdfGenerator = ({ name, month, initialBudget, currentBudget, transactions }) => {

    const handleDownloadTransactions = () => {
        if (transactions.length === 0) {
            alert('No transactions available to download.');
            return;
        }

        const doc = new jsPDF();

        // Add title and details to the PDF
        doc.setFontSize(18);
        doc.text("Transaction Statement", 14, 20);
        doc.setFontSize(12);
        doc.text(`Name: ${name}`, 14, 30);
        doc.text(`Month: ${month}`, 14, 35);
        doc.text(`Initial Budget: ₹${initialBudget}`, 14, 40);
        doc.text(`Remaining Budget: ₹${currentBudget}`, 14, 45);

        // Prepare transaction data for the table
        const headers = [["Date & Time", "Category", "Expense", "Income", "Balance"]];
        let runningBalance = initialBudget;

        const rows = transactions.map(t => {
            const dateTime = new Date().toLocaleString(); // For demonstration, replace with actual transaction datetime
            const isExpense = t.type === 'expense';
            const amount = t.amount;
            const expense = isExpense ? `₹${amount}` : "-";
            const income = !isExpense ? `₹${amount}` : "-";

            runningBalance = isExpense ? runningBalance - amount : runningBalance + amount;

            return [
                dateTime,
                t.expenseType,
                expense,
                income,
                `₹${runningBalance}`
            ];
        });

        // Generate table in PDF
        doc.autoTable({
            head: headers,
            body: rows,
            startY: 55,
            theme: 'striped',
            styles: {
                cellPadding: 4,
                fontSize: 10,
            },
            columnStyles: {
                2: {
                    cellStyles: {
                        textColor: [255, 0, 0] // Red color for Expense
                    }
                },
                3: {
                    cellStyles: {
                        textColor: [0, 255, 0] // Green color for Income
                    }
                }
            }
        });

        // Save the PDF
        doc.save(`${name}_transactions_${month}.pdf`);
    };

    return (
        <>
            {transactions.length > 0 && (
                <button onClick={handleDownloadTransactions}>
                    Download Transactions
                </button>
            )}
        </>
    );
};

export default PdfGenerator;
