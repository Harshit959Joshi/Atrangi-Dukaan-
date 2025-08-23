const bar=document.getElementById('bar');
const close=document.getElementById('close');
const nav=document.getElementById('navbar');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove ('active');
    })
}


// Add item to cart
function addToCart(button) {
    const code = button.getAttribute('data-code');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.code === code);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ code, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// Load cart on cart page
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartItems.innerHTML += `
            <tr>
                <td><a href="#" onclick="removeFromCart(${index})"><i class="fa-solid fa-times-circle"></i></a></td>
                <td><img src="img/products/f1.jpg" alt=""></td>
                <td>${item.name} (${item.code})</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
                <td>₹${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById('subtotal-amount').innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById('total-amount').innerText = `₹${subtotal.toFixed(2)}`;
}

// Update quantity
function updateQuantity(index, value) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(value);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Remove item
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Checkout via WhatsApp
function checkoutViaWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = `🛒 *New Order - Atrangi Dukaan*\n\n`;
    let total = 0;

    cart.forEach(item => {
        message += `• ${item.name} (${item.code}) x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}\n`;
        total += item.price * item.quantity;
    });

    message += `\n💰 *Total: ₹${total.toFixed(2)}*`;

    const phone = "7895386211"; // change to your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(url, "_blank");
}

// Auto-load cart when on cart page
window.addEventListener("DOMContentLoaded", loadCart);



