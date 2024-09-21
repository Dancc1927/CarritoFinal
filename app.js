let products = [];
let cart = [];

// Lista productos con categorias
window.onload = function () {
    fetchProducts();
    fetchCategories();
}

// Fetch recorre la api y la respuesta la convuerte en formato Json
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        // fetch recorre la api de los productos por categoria
async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        populateCategoryFilter(categories);
    } catch (error) {
        console.error('Error al obtener categorias:', error);
    }
}

//filtro por categoria
function CategoryFilter(categories) {
    const categoryFilter = document.getElementById('filter_category');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = capitalizeFirstLetter(category);
        categoryFilter.appendChild(option);
    });
}

// 
function FirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// mostrar lista de productos
function displayProducts(productsToDisplay) {
    const productContainer = document.getElementById('list_product');
    productContainer.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}" width="100" height="100">
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// guardar productos en el carrito
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        alert('Producto ya agregado en el carrito');
    } else {
        // guarda el producto seleccionado y la cuenta la empieza dede 1
        cart.push({ ...product, quantity: 1 });
        updateCart();
    }
}

// actuliza el carrito, aumenta, disminuye y elimina los productos 
function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <h4>${item.title}</h4>
            <p>Precio: $${item.price}</p>
            <p>Cantidad: 
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </p>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    displayCartSummary();
}

// cambia, renueva la cuenta qu hay en e carrito
function changeQuantity(productId, amount) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += amount;
        if (cartItem.quantity === 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// borra los productos del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// muestra el total del carrito
function displayCartSummary() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const summary = document.getElementById('cart-summary');
    summary.innerHTML = `Total: $${total.toFixed(2)}`;
}

// ordena los precios
function handlePriceSort(order) {
    if (order === 'asc' || order === 'desc') {
        filterByPrice(order);
    }
}

// ordena por categoria
function handleCategoryFilter(category) {
    if (category) {
        filterByCategory(category);
    } else {
        displayProducts(products);
    }
}

// Filtra los precios y los ordena
function filterByPrice(order) {
    const sortedProducts = [...products].sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    displayProducts(sortedProducts);
}

// Filtra por  categoria y los muestra
function filterByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}
        