//Nothing Yet
 let astronomyData = [];

    function loadCSV() {
      Papa.parse('path/to/astronomy.csv', {
        download: true,
        header: true,
        complete: function(results) {
          astronomyData = results.data;
          displayData(astronomyData);
        }
      });
    }

    function displayData(data) {
      const tbody = document.getElementById('resultsTable').querySelector('tbody');
      tbody.innerHTML = '';

      data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(val => {
          const cell = document.createElement('td');
          cell.textContent = val;
          row.appendChild(cell);
        });
        tbody.appendChild(row);
      });
    }

    function searchData() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const filteredData = astronomyData.filter(item => {
        return Object.values(item).some(val => val.toLowerCase().includes(query));
      });
      displayData(filteredData);
    }

    window.onload = loadCSV;
