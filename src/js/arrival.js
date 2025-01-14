// Add functionality for category click (if needed)
const categories = document.querySelectorAll('.category');
categories.forEach(category => {
    category.addEventListener('click', () => {
        alert(`Category: ${category.textContent} clicked!`);
    });
});