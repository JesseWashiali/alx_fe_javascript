// Initialize quotes array and load from local storage
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to generate a new quote
function newQuote() {
    const quote = {
        text: `Quote ${quotes.length + 1}`,
        author: 'Anonymous'
    };
    quotes.push(quote);
    saveQuotes();
    displayQuote();
}

// Function to display the current quote
function displayQuote() {
    const quoteElement = document.getElementById('quote');
    quoteElement.textContent = `${quotes[quotes.length - 1].text} - ${quotes[quotes.length - 1].author}`;
}

// Function to export quotes to JSON file
function exportQuotes() {
    const jsonQuotes = JSON.stringify(quotes);
    const blob = new Blob([jsonQuotes], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Add event listeners
document.getElementById('new-quote').addEventListener('click', newQuote);
document.getElementById('export-quotes').addEventListener('click', exportQuotes);

// Initialize the app
displayQuote();
 
