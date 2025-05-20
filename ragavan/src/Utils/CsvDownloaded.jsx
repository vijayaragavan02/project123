import React from 'react';

const CsvDownloader = ({ data }) => {
  const downloadCsv = () => {
    const headers = ['Title', 'Amount', 'Category', 'Type'];
    const rows = data.map(t => [t.title, t.amount, t.category, t.type]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return <button onClick={downloadCsv}>Download CSV</button>;
};

export default CsvDownloader;