document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    if (!productContainer) return;

    // 1. Get ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productIdParam = urlParams.get('id');

    // Handle missing ID
    if (!productIdParam) {
        productContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <h2 style="font-size: 2rem; color: var(--text-primary); margin-bottom: 1rem;">Product Not Found</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">We couldn't figure out which product you're looking for.</p>
                <a href="index.html" class="btn btn-primary">Return to Shop</a>
            </div>
        `;
        return;
    }

    const productId = parseInt(productIdParam);

    // 2. Look up product in globalProducts array (from data.js)
    const product = globalProducts.find(p => p.id === productId);

    // Handle invalid ID
    if (!product) {
        productContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <h2 style="font-size: 2rem; color: var(--text-primary); margin-bottom: 1rem;">Product Not Found</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">The product you requested does not exist or has been removed.</p>
                <a href="index.html" class="btn btn-primary">Return to Shop</a>
            </div>
        `;
        return;
    }

    // 3. Format Currency
    const formatPrice = (price) => `Rs. ${price.toLocaleString('en-PK')}`;

    // 4. Generate Stars
    let stars = '';
    const ratingNum = parseFloat(product.rating);
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="ph-fill ph-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="ph-fill ph-star-half"></i>';
        } else {
            stars += '<i class="ph ph-star"></i>';
        }
    }

    // 5. Build HTML String
    const originalPriceHTML = product.originalPrice ? `<span class="original-price-large">${formatPrice(product.originalPrice)}</span>` : '';
    const subCategoryText = product.subcategory ? `<span>/</span> <span>${product.subcategory}</span>` : '';

    const htmlString = `
        <!-- Left: Image Viewer -->
        <div class="product-image-viewer" id="main-image-container">
            <img src="${product.imgPrimary}" alt="${product.name}" id="main-product-img">
            
            <button id="btn-view-3d" style="position: absolute; bottom: 1rem; right: 1rem; background: rgba(0,0,0,0.7); color: white; border: none; padding: 0.5rem 1rem; border-radius: var(--radius-full); display: flex; align-items: center; gap: 0.5rem; cursor: pointer; backdrop-filter: blur(4px); transition: background 0.2s; font-size: 0.9rem; z-index: 10;">
                <i class="ph ph-cube"></i> View in 3D
            </button>
        </div>

        <!-- Right: Details -->
        <div class="product-details">
            <div class="product-breadcrumbs">
                <a href="index.html" style="color: inherit; text-decoration: none;">Home</a> 
                <span>/</span> 
                <a href="categories.html" style="color: inherit; text-decoration: none;">${product.category}</a>
                ${subCategoryText}
            </div>

            <h1 class="product-title-large">${product.name}</h1>
            
            <div class="product-rating-large">
                ${stars}
                <span class="count">(${product.reviews} verified reviews)</span>
            </div>

            <div class="product-price-large">
                ${formatPrice(product.price)}
                ${originalPriceHTML}
            </div>

            <p class="product-description">
                Experience premium quality with the ${product.name}. Carefully crafted to exceed expectations, this item represents the pinnacle of modern design and functionality. Perfect for daily use and guaranteed to elevate your lifestyle.
            </p>

            <table class="product-specs">
                <tbody>
                    <tr>
                        <td>Availability</td>
                        <td style="color: #27ae60; font-weight: 600;"><i class="ph ph-check-circle" style="vertical-align: middle;"></i> In Stock</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>Dispatches within 24 hours</td>
                    </tr>
                    <tr>
                        <td>Return Policy</td>
                        <td>7 Days Easy Return</td>
                    </tr>
                </tbody>
            </table>

            <div class="action-row">
                <button class="btn-massive btn-add-main" id="btn-add-to-cart-page">
                    <i class="ph ph-shopping-cart-simple"></i> Add to Cart
                </button>
                <button class="btn-wishlist" aria-label="Add to Wishlist">
                    <i class="ph ph-heart"></i>
                </button>
            </div>
            
            <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); color: var(--text-secondary);">
                <i class="ph ph-shield-check" style="font-size: 1.5rem;"></i> <span>Secure Checkout</span>
                <i class="ph ph-truck" style="font-size: 1.5rem; margin-left: 1rem;"></i> <span>Fast Delivery</span>
            </div>
        </div>
    `;

    // 6. Inject HTML
    productContainer.innerHTML = htmlString;

    // 7. Attach Add To Cart Logic specific to this page
    const addToCartBtn = document.getElementById('btn-add-to-cart-page');
    addToCartBtn.addEventListener('click', () => {
        // Visual feedback
        addToCartBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Processing...';
        addToCartBtn.disabled = true;

        // Save to cart
        let cart = JSON.parse(localStorage.getItem('iffy_cart')) || [];
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.imgPrimary
        });
        localStorage.setItem('iffy_cart', JSON.stringify(cart));

        setTimeout(() => {
            // Success state
            addToCartBtn.innerHTML = '<i class="ph ph-check"></i> Added Successfully';
            addToCartBtn.style.background = '#27ae60';
            addToCartBtn.style.borderColor = '#27ae60';

            // Show global toast
            const toastContainer = document.getElementById('toast-container');
            if (toastContainer) {
                const toast = document.createElement('div');
                toast.className = 'toast toast-success';
                toast.innerHTML = `<i class="ph-fill ph-check-circle"></i><span>Item added to your cart!</span>`;
                toastContainer.appendChild(toast);
                setTimeout(() => toast.classList.add('show'), 10);
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 400);
                }, 3000);
            }

            // Update badge immediately
            const cartBadge = document.querySelector('.cart-badge');
            if (cartBadge) {
                cartBadge.innerText = cart.length;
                cartBadge.style.transform = 'scale(1.5)';
                setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
            }

            // Restore button
            setTimeout(() => {
                addToCartBtn.innerHTML = '<i class="ph ph-shopping-cart-simple"></i> Add to Cart';
                addToCartBtn.disabled = false;
                addToCartBtn.style.background = '';
                addToCartBtn.style.borderColor = '';
            }, 2500);

        }, 600);
    });

    // 8. Attach 3D Viewer Logic
    const btnView3D = document.getElementById('btn-view-3d');
    const imageContainer = document.getElementById('main-image-container');

    if (btnView3D && imageContainer) {
        btnView3D.addEventListener('click', () => {
            // Using a stable high quality generic shoe model provided by Google's model-viewer examples
            const modelUrl = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';

            // Swap out the entire content of the container for the 3D viewer
            imageContainer.innerHTML = `
                <model-viewer 
                    src="${modelUrl}" 
                    alt="A 3D model of ${product.name}" 
                    auto-rotate 
                    camera-controls 
                    style="width: 100%; height: 100%; min-height: 400px; background-color: #f1f1f1;">
                </model-viewer>
                <button onclick="location.reload()" style="position: absolute; top: 1.5rem; right: 1.5rem; background: var(--brand-primary); color: white; border: none; padding: 0.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 50; width: 44px; height: 44px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                    <i class="ph ph-x" style="font-size: 1.25rem;"></i>
                </button>
            `;
        });
    }

    // Update Document Title
    document.title = `${product.name} | Iffy Marketplace`;
});
