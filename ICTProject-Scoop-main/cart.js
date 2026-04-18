// Save Cart to LocalStorage
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Get Cart from LocalStorage
function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

// Add to Cart Function
function addToCart(id, name, price) {
    let cart = getCart();
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    saveCart(cart);
    alert(`${name} added to cart!`);
}

// Render Cart
function displayCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!cartContainer) return;

    cartContainer.innerHTML = ''; 
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <p class="nunito-ex-bold ice-cream-info">${item.name} - (${item.quantity})</p>
                <button class="btn" onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
    });

    totalElement.innerText = `Total: Rs.${total}`;
}

// Remove Item
function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    displayCart();
}

if (document.getElementById('cart-items')) {
    displayCart();
}

function checkCartBeforeCheckout(event) {
    const cart = getCart();
    if (cart.length === 0) {
        event.preventDefault(); // Stops the link from opening form.html
        alert("Wait! Your cart is empty. Please add some scoops first!");
        return false;
    }
    return true;
}