// main.js
const form = document.getElementById('entryForm');
const quoteDisplay = document.getElementById('quoteDisplay');

const quoteImages = [
  `<img src="images/Quote1.png" alt="Believe in yourself and all that you are.">`,
  `<img src="images/Quote2.png" alt="The secret of getting ahead is getting started.">`,
  `<img src="images/Quote3.png" alt="You are stronger than you think.">`,
  `<img src="images/Quote4.png" alt="Progress, not perfection.">`,
  `<img src="images/Quote5.png" alt="Every day is a new beginning.">`
];

function showRandomQuote() {
  const quoteBox = document.getElementById("quote-box");
  const randomIndex = Math.floor(Math.random() * quoteImages.length);
  quoteBox.innerHTML = quoteImages[randomIndex];
}

window.onload = showRandomQuote;

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
