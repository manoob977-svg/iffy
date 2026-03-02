/**
 * UI Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Toast Notifications (One-Click Checkout Mock) ---
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'success') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = type === 'success' ? 'ph-check-circle' : 'ph-info';

        toast.innerHTML = `
            <i class="ph-fill ${icon}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Trigger reflow for animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400); // wait for transition
        }, 3000);
    }

    // Attach to checkout buttons
    const buyButtons = document.querySelectorAll('.btn-add-cart');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Simulating One-Click Checkout
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i>';

            setTimeout(() => {
                btn.innerHTML = '<i class="ph ph-check"></i>';
                showToast('Order placed successfully! (One-Click Checkout)');

                setTimeout(() => {
                    btn.innerHTML = '<i class="ph ph-plus"></i>';
                }, 2000);

            }, 800);
        });
    });


    // --- Generic Modal Logic ---
    const modals = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.close-modal-btn');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        }
    }

    function closeModal() {
        modals.forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });


    // --- Visual Search ---
    const visualSearchBtn = document.getElementById('btn-visual-search');
    if (visualSearchBtn) {
        visualSearchBtn.addEventListener('click', () => openModal('modal-visual-search'));
    }


    // --- 360 View Mock ---
    const view360Btns = document.querySelectorAll('.btn-360-view');
    view360Btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real app, grab the product image/id. Here we just open the mock.
            openModal('modal-360-view');
        });
    });


    // --- Size Guide Mock ---
    const sizeGuideBtns = document.querySelectorAll('.btn-size-guide');
    sizeGuideBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('modal-size-guide');

            // hide recommendation for a fresh experience
            const rec = document.getElementById('size-recommendation');
            if (rec) rec.classList.remove('show');
        });
    });

    const btnPredictSize = document.getElementById('btn-predict-size');
    if (btnPredictSize) {
        btnPredictSize.addEventListener('click', () => {
            btnPredictSize.innerHTML = 'Analyzing...';

            setTimeout(() => {
                document.getElementById('size-recommendation').classList.add('show');
                btnPredictSize.innerHTML = 'Predict Size';
            }, 1000);
        });
    }

    // --- Draggable Floating Sidebar ---
    const floatingSidebar = document.querySelector('.floating-sidebar');
    if (floatingSidebar) {
        let isDragging = false;
        let startX, startY, currentX = 0, currentY = 0;
        let isMoved = false;

        floatingSidebar.style.cursor = 'grab';

        // Mouse events
        floatingSidebar.addEventListener('mousedown', (e) => {
            // Ignore if clicking on a scrollbar or heavily nested element (optional), but here we just grab the whole sidebar
            isDragging = true;
            isMoved = false;
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
            floatingSidebar.style.transition = 'none'; // disable CSS transition so it tracks mouse instantly
            floatingSidebar.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            isMoved = true;
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            // Native CSS uses translateY(-50%), we need to preserve that math
            floatingSidebar.style.transform = `translate3d(${currentX}px, calc(-50% + ${currentY}px), 0)`;
        });

        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            floatingSidebar.style.transition = ''; // restore to css styles
            floatingSidebar.style.cursor = 'grab';
        });

        // Touch events
        floatingSidebar.addEventListener('touchstart', (e) => {
            isDragging = true;
            isMoved = false;
            startX = e.touches[0].clientX - currentX;
            startY = e.touches[0].clientY - currentY;
            floatingSidebar.style.transition = 'none';
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            isMoved = true;
            currentX = e.touches[0].clientX - startX;
            currentY = e.touches[0].clientY - startY;
            floatingSidebar.style.transform = `translate3d(${currentX}px, calc(-50% + ${currentY}px), 0)`;
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            floatingSidebar.style.transition = '';
        });

        // Prevent accidental clicks on links if the user was actually intending to drag
        floatingSidebar.addEventListener('click', (e) => {
            if (isMoved) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    // --- Live Purchase Simulator (Social Proof) ---
    // Creates random toast notifications simulating other users buying products
    function initLivePurchaseSimulator() {
        if (!toastContainer) return;

        const cities = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Multan", "Peshawar", "Quetta", "Rawalpindi"];
        const products = [
            "Ultra-Thin Book 13", "Gaming Mouse RGB", "Premium Oxford Shirt",
            "Noise Cancelling Headphones", "Adjustable Dumbbell Set",
            "Midnight Rose EDP", "Vitamin C Brightening Cream", "Minimalist Sneakers"
        ];
        const names = ["Ali", "Ayesha", "Zain", "Fatima", "Usman", "Zara", "Bilal", "Sana", "Hamza"];

        function triggerRandomPurchase() {
            // Randomly pick details
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            const randomName = names[Math.floor(Math.random() * names.length)];

            // Create specific toast
            const toast = document.createElement('div');
            toast.className = 'toast toast-info'; // Use info variant for social proof
            toast.style.cursor = "pointer";
            toast.innerHTML = `
                <i class="ph-fill ph-bag" style="color: var(--brand-secondary);"></i>
                <span><strong>${randomName} from ${randomCity}</strong> just bought:<br><i style="font-size: 0.85em; opacity: 0.9;">${randomProduct}</i></span>
            `;

            // Allow dismiss on click
            toast.addEventListener('click', () => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            });

            toastContainer.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 10);

            // Remove after 5 seconds
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 400);
                }
            }, 5000);

            // Schedule the next one between 15 and 45 seconds from now
            const nextInterval = Math.floor(Math.random() * (45000 - 15000 + 1) + 15000);
            setTimeout(triggerRandomPurchase, nextInterval);
        }

        // Start the simulator 10 seconds after page load
        setTimeout(triggerRandomPurchase, 10000);
    }

    initLivePurchaseSimulator();


});
