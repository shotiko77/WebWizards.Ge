document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const gameBoxes = document.querySelectorAll('.game-box');
    
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        
        gameBoxes.forEach(box => {
            const title = box.querySelector('h3').textContent.toLowerCase();
            const description = box.querySelector('p') ? box.querySelector('p').textContent.toLowerCase() : '';
            
            if (title.includes(query) || description.includes(query)) {
                box.style.display = 'block'; // Show matching items
            } else {
                box.style.display = 'none'; // Hide non-matching items
            }
        });
    });
});


// main.js

// Initialize cart and total amount
let cart = [];
let totalAmount = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Get all 'Buy Now' buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    // Add click event listener to each button
    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Get the parent game box
            const gameBox = event.target.closest('.game-box');
            
            // Get game details from data attributes
            const gameName = gameBox.getAttribute('data-name');
            const gamePrice = parseFloat(gameBox.getAttribute('data-price'));
            
            // Add game to cart
            addToCart(gameName, gamePrice);
            
            // Update total amount
            updateTotalAmount();
        });
    });
});

// Function to add a game to the cart
function addToCart(name, price) {
    // Check if the game is already in the cart
    const existingGame = cart.find(item => item.name === name);
    
    if (existingGame) {
        // If already in cart, increase the quantity
        existingGame.quantity++;
    } else {
        // Otherwise, add new game with quantity 1
        cart.push({ name, price, quantity: 1 });
    }
}

// Function to update the total amount
function updateTotalAmount() {
    // Calculate the total amount
    totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Display the total amount (you can adjust where to display this)
    const totalAmountElement = document.getElementById('total-amount');
    if (totalAmountElement) {
        totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function showSlide(index) {
        slider.style.transform = `translateX(${-index * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Automatically transition every 5 seconds
    setInterval(nextSlide, 5000);
});

document.getElementById('login-button').addEventListener('click', () => {
    window.location.href = '/auth/google';
  });
  
  // Optionally, fetch and display profile info after login
  window.addEventListener('load', () => {
    fetch('/profile')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not authenticated');
      })
      .then(user => {
        document.getElementById('profile').innerHTML = `
          <h2>Hello, ${user.displayName}</h2>
          <img src="${user._json.picture}" alt="Profile Picture">
          <p>Email: ${user._json.email}</p>
        `;
        document.getElementById('profile').classList.remove('hidden');
      })
      .catch(error => {
        console.error(error);
        document.getElementById('profile').innerHTML = '<p>Please login</p>';
        document.getElementById('profile').classList.remove('hidden');
      });
  });
  


  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const gameBoxes = document.querySelectorAll('.game-box');
    
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        
        gameBoxes.forEach(box => {
            const title = box.querySelector('h3') ? box.querySelector('h3').textContent.toLowerCase() : '';
            const description = box.querySelector('p') ? box.querySelector('p').textContent.toLowerCase() : '';
            
            if (title.includes(query) || description.includes(query)) {
                box.style.display = 'block'; // Show matching items
            } else {
                box.style.display = 'none'; // Hide non-matching items
            }
        });
    });
});


