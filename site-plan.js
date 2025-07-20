// main.js
const form = document.getElementById('entryForm');
const quoteDisplay = document.getElementById('quoteDisplay');

const quotes = [
  "Believe in yourself and all that you are.",
  "The secret of getting ahead is getting started.",
  "You are stronger than you think.",
  "Progress, not perfection.",
  "Every day is a new beginning."
];

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function loadQuote() {
  quoteDisplay.textContent = getRandomQuote();
}

function saveEntry(entry) {
  let entries = JSON.parse(localStorage.getItem('mindspaceEntries')) || [];
  entries.push(entry);
  localStorage.setItem('mindspaceEntries', JSON.stringify(entries));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const mood = document.getElementById('mood').value;
  const productivity = document.getElementById('productivity').value;
  const notes = document.getElementById('notes').value;
  const date = new Date().toISOString().split('T')[0];

  const entry = { date, mood, productivity, notes };
  saveEntry(entry);
  alert("Entry saved!");
  form.reset();
  loadQuote();
});

window.addEventListener('DOMContentLoaded', loadQuote);
