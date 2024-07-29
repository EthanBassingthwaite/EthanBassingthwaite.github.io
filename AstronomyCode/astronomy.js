const data = [
  { name: "Alpha Centauri", type: "Star", distance: 4.37 },
  { name: "Betelgeuse", type: "Star", distance: 642.5 },
  { name: "Sirius", type: "Star", distance: 8.6 },
  // More data entries...
];

function searchData() {
  const nameValue = document.getElementById('nameInput').value.toLowerCase();
  const typeValue = document.getElementById('typeInput').value.toLowerCase();
  const distanceValue = parseFloat(document.getElementById('distanceInput').value);

  const filteredData = data.filter(item => {
    return (
      (nameValue === '' || item.name.toLowerCase().includes(nameValue)) &&
      (typeValue === '' || item.type.toLowerCase().includes(typeValue)) &&
      (isNaN(distanceValue) || item.distance <= distanceValue)
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
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>${item.distance}</td>
    `;
    tbody.appendChild(row);
  });
}
