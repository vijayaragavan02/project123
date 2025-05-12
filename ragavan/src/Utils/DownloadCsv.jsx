
export const downloadCSV = (transactions) => {
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Note'];
    const rows = transactions.map(t => [t.date, t.type, t.category, t.amount, t.note]);
  
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
  };
  