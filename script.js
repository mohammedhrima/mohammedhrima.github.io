let currentPage = 0;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;
const navbarLinks = document.querySelectorAll('.navbar a');
let isScrolling = false;

// Function to update the navbar based on the current page
function updateNavbar(index) {
    navbarLinks.forEach((link, i) => {
        if (i === index) link.classList.add('active');
        else link.classList.remove('active');
    });
}

// Function to scroll to a specific page
function scrollToPage(index) {
    if (index < 0 || index >= totalPages) return; // Prevent out-of-bounds scrolling
    isScrolling = true;
    pages[index].scrollIntoView({ behavior: 'smooth' });
    currentPage = index;
    updateNavbar(index);

    // Update the hash without triggering hashchange
    const sectionId = pages[index].id;
    history.replaceState(null, null, `#${sectionId}`);

    setTimeout(() => {
        isScrolling = false;
    }, 400); // Adjust timeout to match the duration of the smooth scroll
}

// Handle wheel (scroll) events
window.addEventListener('wheel', (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0 && currentPage < totalPages - 1) {
        scrollToPage(currentPage + 1); // Scroll to the next page
    } else if (event.deltaY < 0 && currentPage > 0) {
        scrollToPage(currentPage - 1); // Scroll to the previous page
    }
});

// Handle hashchange events
window.addEventListener('hashchange', () => {
    if (isScrolling) return; // Ignore hashchange triggered by smooth scrolling

    const sectionId = window.location.hash.substring(1); // Get the section ID from the hash
    const targetPage = Array.from(pages).findIndex((page) => page.id === sectionId);

    if (targetPage !== -1 && targetPage !== currentPage) {
        scrollToPage(targetPage); // Scroll to the target page
    }
});

// Handle navbar link clicks
navbarLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        scrollToPage(index); // Scroll to the corresponding page
    });
});

// Handle navbar toggle button click
const toggleButton = document.querySelector('.show-navbar');
const navbar = document.querySelector('.navbar');
toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Initialize based on the current hash
window.addEventListener('load', () => {
    const sectionId = window.location.hash.substring(1);
    const targetPage = Array.from(pages).findIndex((page) => page.id === sectionId);
    if (targetPage !== -1) {
        scrollToPage(targetPage); // Scroll to the target page on page load
    }
});