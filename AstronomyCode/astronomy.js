let tableData = {
    table1: [],
    table2: []
    // Add more tables as needed
};

// Map table IDs to their respective CSV file paths
const csvFiles = {
    table1: './AstronomyCode/Table1Data.csv',
    table2: './AstronomyCode/Table2Data.csv'
    // Add more mappings as needed
};

document.addEventListener('DOMContentLoaded', function () {
    // Load data for each table
    let loadPromises = Object.keys(csvFiles).map(tableId => {
        return fetch(csvFiles[tableId])
            .then(response => response.text())
            .then(contents => {
                tableData[tableId] = Papa.parse(contents, { header: true }).data;
                // Initialize search when all data is loaded
                if (Object.keys(tableData).every(id => tableData[id].length > 0)) {
                    displayResults('table1', tableData.table1); // Display initial table
                }
            });
    });

    Promise.all(loadPromises).then(() => {
        // Setup event listeners
        document.getElementById('YBmax').addEventListener('input', searchData);
        document.getElementById('YBmin').addEventListener('input', searchData);
        document.getElementById('lmax').addEventListener('input', searchData);
        document.getElementById('lmin').addEventListener('input', searchData);
        document.getElementById('bmax').addEventListener('input', searchData);
        document.getElementById('bmin').addEventListener('input', searchData);
    });
});

function searchData() {
    // Get current active table
    const activeTableId = document.querySelector('.tab-content:not([style*="display: none"])').id;

    // Get search parameters
    const MaxYB = parseFloat(document.getElementById('YBmax').value);
    const MinYB = parseFloat(document.getElementById('YBmin').value);
    const MaxL = parseFloat(document.getElementById('lmax').value);
    const MinL = parseFloat(document.getElementById('lmin').value);
    const MaxB = parseFloat(document.getElementById('bmax').value);
    const MinB = parseFloat(document.getElementById('bmin').value);

    // Filter data for the active table
    const filteredData = tableData[activeTableId].filter(item => {
        const YBnum = parseInt(item['YB']);
        const l = parseFloat(item['l']);
        const b = parseFloat(item['b']);

        return (
            (isNaN(MaxB) || b <= MaxB) &&
            (isNaN(MinB) || b >= MinB) &&
            (isNaN(MaxL) || l <= MaxL) &&
            (isNaN(MinL) || l >= MinL) &&
            (isNaN(MaxYB) || YBnum <= MaxYB) &&
            (isNaN(MinYB) || YBnum >= MinYB)
        );
    });

    displayResults(activeTableId, filteredData);
}

function displayResults(tableId, filteredData) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';

    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item['YB']}</td>
          <td>${item['l']}</td>
          <td>${item['b']}</td>
        `;
        tbody.appendChild(row);
    });
}

// Function to show the selected table and hide others
function showTable(tableId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(tableId).style.display = 'block';

    // Reapply the search filter when switching tabs
    applySearchFilter();
}

// Function to apply search filter to the visible table
function applySearchFilter() {
    // Trigger searchData to filter the currently visible table
    searchData();
}

// Initialize by showing the first table
showTable('table1');
