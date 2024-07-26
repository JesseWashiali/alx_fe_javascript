// Initialize quotes array and load from local storage
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to save categories to local storage
function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Function to generate a new quote
function newQuote() {
    const quote = {
        text: `Quote ${quotes.length + 1}`,
        author: 'Anonymous',
        category: prompt('Enter a category for the new quote:')
    };
    quotes.push(quote);
    saveQuotes();
    updateCategories(quote.category);
    displayQuote();
}

// Function to update categories
function updateCategories(newCategory) {
    if (!categories.includes(newCategory)) {
        categories.push(newCategory);
        saveCategories();
        populateCategories();
    }
}

// Function to populate categories dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '';
    categoryFilter.innerHTML += '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory || selectedCategory === 'all');
    displayQuotes(filteredQuotes);
}

// Function to display quotes
function displayQuotes(quotes) {
    const quoteElement = document.getElementById('quote');
    quoteElement.textContent = '';
    quotes.forEach(quote => {
        const quoteText = document.createElement('p');
        quoteText.textContent = `${quote.text} - ${quote.author}`;
        quoteElement.appendChild(quoteText);
    });
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
        updateCategories(importedQuotes.map(quote => quote.category));
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Simulate server interaction using JSONPlaceholder
const apiUrl = 'https://jsonplaceholder.typicode.com/quotes';

// Function to fetch quotes from server
function fetchQuotesFromServer() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const serverQuotes = data;
            syncQuotesWithServer(serverQuotes);
        })
        .catch(error => console.error('Error fetching quotes from server:', error));
}

// Function to sync quotes with server
function sync
