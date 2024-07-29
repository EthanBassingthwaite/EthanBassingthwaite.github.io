    let data = [];

    document.addEventListener('DOMContentLoaded', function () {
      fetch('./AstronomyCode/AstroData.csv') // Adjust the path as necessary
        .then(response => response.text())
        .then(contents => {
          data = Papa.parse(contents, {
            header: true
          }).data;
          
          document.getElementById('YBmax').addEventListener('input', searchData);
          document.getElementById('YBmin').addEventListener('input', searchData);
          document.getElementById('lmax').addEventListener('input', searchData);
          document.getElementById('lmin').addEventListener('input', searchData);
          document.getElementById('bmax').addEventListener('input', searchData);
          document.getElementById('bmin').addEventListener('input', searchData);
          
          
          // Initial display of all data or filtered data if needed
          displayResults(data);
        });
    });

    function searchData() {
      const MaxYB = parseFloat(document.getElementById('YBmax');
      const MinYB = parseFloat(document.getElementById('YBmin');
      const MaxL = parseFloat(document.getElementById('lmax');
      const MinL = parseFloat(document.getElementById('lmin');
      const MaxB = parseFloat(document.getElementById('bmax');
      const MinB = parseFloat(document.getElementById('bmin');
      
      const filteredData = data.filter(item => {
        const YBnum = parseInt(item['YB']);
        const l = parseFload(item['l']);
        const b = parseFloat(item['b']);

        return (
          (isNaN(b) || b <= MaxB && b >= MinB) &&
          (isNaN(l) || l <= MaxL && L >= MinL) &&
          (isNaN(YBnum) || YBnum <= MaxYB && YBnum >= MinYB) 
        );
      });

      displayResults(filteredData);
    }

    function displayResults(filteredData) {
      const tbody = document.querySelector('#resultsTable tbody');
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
