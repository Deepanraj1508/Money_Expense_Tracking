import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/logo.png'

const PdfGenerator = ({ name, month, initialBudget, currentBudget, transactions }) => {

    const generatePDF = () => {
        try {
            const doc = new jsPDF();

            const logoUrl = logo; 
            doc.addImage(logoUrl, 'PNG', 14, 10, 30, 30);

            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("Transaction Statement", 14, 50);
            doc.setFontSize(18);
            doc.setFont("times", "normal");
            doc.text(`Name: ${name}`, 14, 60);
            doc.text(`Month: ${new Date().toLocaleString()}`, 14, 68);   
            doc.setFontSize(14);
            doc.setTextColor(0, 102, 204);
            doc.setFont("times", "bold");
            doc.text(`Initial Amout: ${initialBudget}`, 14, 75);
            doc.setFontSize(14);
            doc.setTextColor('#15ab1f');
            doc.text(`Remaining Amout: ${currentBudget}`, 14, 80);


            const headers = [["Date", "Category", "Expense", "Income", "Balance"]];
            let runningBalance = Number(initialBudget);

const rows = transactions.map((t) => {
    // const dateTime = {month};
    const isExpense = t.type === 'expense';
    const amount = Number(t.amount);
    const expense = isExpense ? ` ${amount.toLocaleString("en-IN")}` : "-";
    const income = !isExpense ? ` ${amount.toLocaleString("en-IN")}` : "-";

    runningBalance = isExpense ? runningBalance - amount : runningBalance + amount;
    const formattedBalance = ` ${runningBalance.toLocaleString("en-IN")}`;

    return [
        month,
        t.expenseType,
        expense,
        income,
        formattedBalance,
    ];
});

            doc.autoTable({
                head: headers,
                body: rows,
                startY: 90,
                theme: 'grid',
                styles: {
                    font: "times",
                    fontSize: 11,
                    textColor: [0, 0, 0],
                    cellPadding: 2,
                    fillColor: [245, 245, 245],
                },
                headStyles: {
                    fillColor: [0, 102, 204],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                },
                columnStyles: {
                    2: { textColor: [255, 0, 0] },  // Red for Expense
                    3: { textColor: [0, 128, 0] },  // Green for Income
                }
            });

            return doc;
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating the PDF.");
            return null;
        }
    };

    const handleDownloadTransactions = () => {
        const doc = generatePDF();
        if (doc) {
            doc.save(`${name}_transactions_${month}.pdf`);
        }
    };

    const handlePreviewTransactions = () => {
        const doc = generatePDF();
        if (doc) {
            const pdfUrl = doc.output('bloburl');
            window.open(pdfUrl, '_blank');
        }
    };

    return (
        <div>
            <button onClick={handlePreviewTransactions}>
                Preview Transactions
            </button>
            <button onClick={handleDownloadTransactions}>
                Download Transactions
            </button>
        </div>
    );
};

export default PdfGenerator;
