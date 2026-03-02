document.addEventListener('DOMContentLoaded', () => {

    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    // Use the globalProducts array provided by data.js
    const products = [...globalProducts];

    // Shuffle all 69 products array to mix categories
    products.sort(() => Math.random() - 0.5);

    // Format currency to PKR
    const formatPrice = (price) => `Rs. ${price.toLocaleString('en-PK')}`;

    // Render products function
    function renderProducts(productList) {
        productGrid.innerHTML = ''; // Clear existing

        if (productList.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);">No products found matching these filters.</p>';
            return;
        }

        productList.forEach(product => {
            const starsHTML = generateStars(product.rating);
            const badgesHTML = [];
            if (product.isSale) badgesHTML.push(`<span class="badge-sale">Sale</span>`);
            if (product.isNew) badgesHTML.push(`<span class="badge-sale" style="background:var(--secondary-color);">New</span>`);

            const originalPriceHTML = product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : '';

            // Subcategory subtitle
            const subCategorySubtitle = product.subcategory ? `<br><span style="font-size:0.75rem; color: var(--text-secondary);">${product.subcategory}</span>` : '';

            const cardHTML = `
                <div class="product-card">
                    <div class="product-image-container">
                        <a href="product.html?id=${product.id}" style="display: block; width: 100%; height: 100%;">
                            <img src="${product.imgPrimary}" alt="${product.name}" class="product-img primary">
                        </a>
                        <div class="card-badges">
                            ${badgesHTML.join('')}
                        </div>
                        <div class="card-actions">
                            <button class="action-btn btn-360-view" title="360° View" aria-label="360 View">
                                <i class="ph ph-arrows-out-line-horizontal"></i>
                            </button>
                            <button class="action-btn" title="Add to Wishlist" aria-label="Add to Wishlist">
                                <i class="ph ph-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="product-category">${product.category} ${subCategorySubtitle}</span>
                        <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                            <h3 class="product-title">${product.name}</h3>
                        </a>
                        <div class="product-rating">
                            ${starsHTML}
                            <span class="rating-count">(${product.reviews})</span>
                        </div>
                        <div class="product-footer">
                            <div class="product-price">
                                <span class="current-price">${formatPrice(product.price)}</span>
                                ${originalPriceHTML}
                            </div>
                            <button class="add-to-cart-btn btn-add-cart-dynamic" 
                                aria-label="Add to Cart"
                                data-id="${product.id}"
                                data-name="${product.name}"
                                data-price="${product.price}"
                                data-img="${product.imgPrimary}">
                                <i class="ph ph-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        attachDynamicEvents();
    }

    function generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<i class="ph-fill ph-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<i class="ph-fill ph-star-half"></i>';
            } else {
                stars += '<i class="ph ph-star"></i>';
            }
        }
        return stars;
    }

    // Cart Storage functionality
    let cart = JSON.parse(localStorage.getItem('iffy_cart')) || [];

    function updateCartBadge() {
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.innerText = cart.length;
        }
    }

    // Call it immediately on load
    updateCartBadge();

    // Attach events to dynamically rendered Add to Cart buttons
    function attachDynamicEvents() {
        const buyButtons = document.querySelectorAll('.btn-add-cart-dynamic');
        const cartBadge = document.querySelector('.cart-badge');
        const toastContainer = document.getElementById('toast-container');

        function showDynamicToast(message) {
            if (!toastContainer) return;
            const toast = document.createElement('div');
            toast.className = 'toast toast-success';
            toast.innerHTML = `<i class="ph-fill ph-check-circle"></i><span>${message}</span>`;
            toastContainer.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }, 3000);
        }

        buyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i>';
                btn.disabled = true;

                // Add to Local Storage
                const productObj = {
                    id: btn.dataset.id,
                    name: btn.dataset.name,
                    price: parseInt(btn.dataset.price),
                    img: btn.dataset.img
                };
                cart.push(productObj);
                localStorage.setItem('iffy_cart', JSON.stringify(cart));

                setTimeout(() => {
                    btn.innerHTML = '<i class="ph ph-check"></i>';
                    showDynamicToast('Added to Cart Successfully!');

                    // Update Badge
                    updateCartBadge();
                    if (cartBadge) {
                        cartBadge.style.transform = 'scale(1.5)';
                        setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
                    }

                    setTimeout(() => {
                        btn.innerHTML = '<i class="ph ph-plus"></i>';
                        btn.disabled = false;
                    }, 2000);

                }, 800);
            });
        });
    }

    // Initial Full Render
    renderProducts(products);

    // Setup Advanced Filtering Logic
    const filterContainer = document.getElementById('category-filters');
    if (filterContainer) {
        const checkboxes = filterContainer.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const isAllCb = cb.dataset.filter === 'All';

                if (isAllCb && cb.checked) {
                    // If "All" is checked, uncheck everything else
                    checkboxes.forEach(c => { if (c !== cb) c.checked = false; });
                    renderProducts(products);
                    return;
                } else if (!isAllCb && cb.checked) {
                    // If something else is checked, uncheck "All"
                    const allCb = filterContainer.querySelector('input[data-filter="All"]');
                    if (allCb) allCb.checked = false;
                }

                // Gather checked filters
                const checkedMains = Array.from(checkboxes)
                    .filter(c => c.checked && c.dataset.type === 'main')
                    .map(c => c.dataset.filter);
                const checkedSubs = Array.from(checkboxes)
                    .filter(c => c.checked && c.dataset.type === 'sub')
                    .map(c => c.dataset.filter);

                // If nothing is checked, fallback to "All"
                if (checkedMains.length === 0 && checkedSubs.length === 0) {
                    const allCb = filterContainer.querySelector('input[data-filter="All"]');
                    if (allCb) allCb.checked = true;
                    renderProducts(products);
                    return;
                }

                // Filtering Logic
                const filtered = products.filter(p => {
                    // First check if its exact subcategory is checked
                    if (checkedSubs.includes(p.subcategory)) {
                        return true;
                    }

                    // If its main category is checked, we include it IF:
                    // 1. None of its subcategories are explicitly checked OR
                    // 2. We just allow the main category to include everything within it
                    // Let's implement: "Checking a main category shows all products in it (including subs)"
                    if (checkedMains.includes(p.category)) {
                        return true;
                    }

                    return false;
                });

                renderProducts(filtered);
            });
        });
    }
});
