let tableData = {
    table1: [],
    table2: []
    // Add more tables as needed
};

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
                // Initialize table display when all data is loaded
                if (Object.keys(tableData).every(id => tableData[id].length > 0)) {
                    // Initialize the first table
                    displayResults('table1', tableData.table1);
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
    const activeTableId = document.querySelector('.tab-content:not([style*="display: none"])').id;

    const MaxYB = parseFloat(document.getElementById('YBmax').value);
    const MinYB = parseFloat(document.getElementById('YBmin').value);
    const MaxL = parseFloat(document.getElementById('lmax').value);
    const MinL = parseFloat(document.getElementById('lmin').value);
    const MaxB = parseFloat(document.getElementById('bmax').value);
    const MinB = parseFloat(document.getElementById('bmin').value);

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

function displayResults(tableId, data) {
    const table = document.querySelector(`#${tableId} table`);
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    // Clear previous content
    thead.innerHTML = '';
    tbody.innerHTML = '';

    if (data.length === 0) return;

    // Generate table headers dynamically
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Generate table rows dynamically
    data.forEach(item => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header] || ''; // Handle missing data gracefully
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
}

function showTable(tableId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(tableId).style.display = 'block';

    applySearchFilter();
}

function applySearchFilter() {
    searchData();
}

// Initialize by showing the first table
showTable('table1');
