document.addEventListener('DOMContentLoaded', () => {
  const entriesContainer = document.getElementById('entriesContainer');
  const filter7 = document.getElementById('filter7');
  const filter30 = document.getElementById('filter30');
  const ctx = document.getElementById('trendChart').getContext('2d');

  let trendChart;

  function getEntries() {
    return JSON.parse(localStorage.getItem('mindspaceEntries')) || [];
  }

  function filterEntriesByDays(entries, days) {
    const today = new Date();
    const cutoff = new Date(today.setDate(today.getDate() - days));
    return entries.filter(entry => new Date(entry.date) >= cutoff);
  }

  function displayEntries(entries) {
    entriesContainer.innerHTML = '';
    if (entries.length === 0) {
      entriesContainer.innerHTML = '<p>No entries found for this range.</p>';
      return;
    }

    entries.forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.classList.add('entry-card');
      entryDiv.innerHTML = `
        <h3>${entry.date}</h3>
        <p><strong>Mood:</strong> ${entry.mood}</p>
        <p><strong>Productivity:</strong> ${entry.productivity}</p>
        <p><strong>Notes:</strong> ${entry.notes || 'None'}</p>
      `;
      entriesContainer.appendChild(entryDiv);
    });
  }

  function summarize(entries) {
    const summary = document.createElement('div');
    summary.classList.add('summary');

    if (entries.length === 0) {
      summary.innerHTML = '<h2>Summary</h2><p>No data to summarize.</p>';
    } else {
      const moods = entries.map(e => parseInt(e.mood));
      const productivities = entries.map(e => parseInt(e.productivity));
      const moodAvg = (moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(2);
      const prodAvg = (productivities.reduce((a, b) => a + b, 0) / productivities.length).toFixed(2);

      summary.innerHTML = `
        <h2>Summary</h2>
        <p>Average Mood: ${moodAvg}</p>
        <p>Average Productivity: ${prodAvg}</p>
      `;
    }

    entriesContainer.prepend(summary);
  }

  function updateChart(entries) {
    const labels = entries.map(e => e.date);
    const moodData = entries.map(e => parseInt(e.mood));
    const prodData = entries.map(e => parseInt(e.productivity));

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Mood',
          data: moodData,
          borderColor: '#5c6bc0',
          backgroundColor: 'rgba(92, 107, 192, 0.2)',
          tension: 0.3
        },
        {
          label: 'Productivity',
          data: prodData,
          borderColor: '#ffb74d',
          backgroundColor: 'rgba(255, 183, 77, 0.2)',
          tension: 0.3
        }
      ]
    };

    if (trendChart) {
      trendChart.destroy();
    }

    trendChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
  }

  function updateView(days) {
    const allEntries = getEntries();
    const filtered = filterEntriesByDays(allEntries, days);
    displayEntries(filtered);
    summarize(filtered);
    updateChart(filtered);
  }

  filter7.addEventListener('click', () => updateView(7));
  filter30.addEventListener('click', () => updateView(30));

  const allEntries = getEntries();
  displayEntries(allEntries);
  summarize(allEntries);
  updateChart(allEntries);
});

