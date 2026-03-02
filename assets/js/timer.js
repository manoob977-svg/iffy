/**
 * Flash Sale Countdown Timer Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!hoursEl || !minutesEl || !secondsEl) return;

    // Set a random time between 2 to 12 hours from now for the sale end
    const now = new Date();
    const endSale = new Date(now.getTime() + (Math.floor(Math.random() * 10) + 2) * 60 * 60 * 1000 + 45 * 60 * 1000 + 30 * 1000);

    function updateTimer() {
        const currentTime = new Date();
        const diff = endSale - currentTime;

        if (diff <= 0) {
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        hoursEl.textContent = h.toString().padStart(2, '0');
        minutesEl.textContent = m.toString().padStart(2, '0');
        secondsEl.textContent = s.toString().padStart(2, '0');
    }

    // Initialize
    updateTimer();
    // Update every second
    setInterval(updateTimer, 1000);
});
