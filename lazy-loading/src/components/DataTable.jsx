import React, { useState } from 'react';

const DataTable = () => {
  // State to track current page (default to page 1)
  const [currentPage, setCurrentPage] = useState(1);

  // Records per page - we'll display 10 records per page
  const recordsPerPage = 10;

  // Generate 30 mock records
  const generateMockData = () => {
    const companies = [
      'Acme Corp',
      'TechStart Inc',
      'Global Solutions',
      'Digital Minds',
      'Cloud Systems',
      'WebFlow Ltd',
      'DataCore',
      'InnovateTech',
      'SecureNet',
      'FutureTech',
    ];

    const firstNames = [
      'John',
      'Jane',
      'Michael',
      'Sarah',
      'David',
      'Emily',
      'Robert',
      'Jessica',
      'James',
      'Lisa',
    ];

    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
      'Rodriguez',
      'Martinez',
    ];

    // Loop through and create 30 records with random data
    const data = [];
    for (let i = 1; i <= 30; i++) {
      data.push({
        id: i,
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        email: `user${i}@example.com`,
        age: Math.floor(Math.random() * (65 - 22 + 1)) + 22,
        company: companies[Math.floor(Math.random() * companies.length)],
      });
    }
    return data;
  };

  // Generate the mock data
  const tableData = generateMockData();

  // Calculate pagination values
  // totalPages = total records / records per page
  const totalPages = Math.ceil(tableData.length / recordsPerPage);

  // Calculate start index for current page
  // For page 1: (1-1) * 10 = 0
  // For page 2: (2-1) * 10 = 10
  // For page 3: (3-1) * 10 = 20
  const startIndex = (currentPage - 1) * recordsPerPage;

  // Calculate end index
  // For page 1: 0 + 10 = 10 (records 0-9)
  // For page 2: 10 + 10 = 20 (records 10-19)
  // For page 3: 20 + 10 = 30 (records 20-29)
  const endIndex = startIndex + recordsPerPage;

  // Get current page data by slicing the array
  const currentPageData = tableData.slice(startIndex, endIndex);

  // CSS Styling
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #388E3C',
  };

  const cellStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };

  const rowStyle = {
    backgroundColor: '#f9f9f9',
  };

  const alternateRowStyle = {
    backgroundColor: '#ffffff',
  };

  // Pagination button styles
  const paginationContainerStyle = {
    display: 'flex',
    gap: '10px',
    margin: '20px 0',
    justifyContent: 'center',
  };

  const buttonStyle = (isActive) => ({
    padding: '10px 15px',
    backgroundColor: isActive ? '#4CAF50' : '#f0f0f0',
    color: isActive ? 'white' : '#333',
    border: `2px solid ${isActive ? '#388E3C' : '#ddd'}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  });

  const pageInfoStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#666',
  };

  // Handle page change when user clicks pagination button
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Database Table with Pagination</h2>
      <p>Displaying 10 records per page (30 total records)</p>
      
      {/* Display current page information */}
      <div style={pageInfoStyle}>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> | 
        Showing records <strong>{startIndex + 1}</strong> to <strong>{Math.min(endIndex, tableData.length)}</strong> of <strong>{tableData.length}</strong>
      </div>

      {/* Main Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>#</th>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Email</th>
            <th style={headerStyle}>Age</th>
            <th style={headerStyle}>Company</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through current page data and display rows */}
          {currentPageData.map((row, index) => (
            <tr key={row.id} style={index % 2 === 0 ? rowStyle : alternateRowStyle}>
              <td style={cellStyle}>{row.id}</td>
              <td style={cellStyle}>{row.name}</td>
              <td style={cellStyle}>{row.email}</td>
              <td style={cellStyle}>{row.age}</td>
              <td style={cellStyle}>{row.company}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div style={paginationContainerStyle}>
        {/* Generate pagination buttons for each page */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            style={buttonStyle(pageNumber === currentPage)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
