const API_URL = 'http://localhost:5000/api/brews';

// === FUNCTION 1: FETCH AND DISPLAY PAST BREWS ===
async function fetchBrews() {
    try {
        const response = await fetch(API_URL);
        const brews = await response.json();
        
        const logList = document.getElementById('logList');
        if (!logList) return;
        logList.innerHTML = ''; // Clear previous items

        brews.forEach(brew => {
            const card = document.createElement('div');
            card.className = 'log-card';
            
            const beansName = brew.title || 'Unknown Coffee';
            const weight = brew.coffeeGrams || 0;
            const volume = brew.waterGrams || 0;
            const ratingStars = '★'.repeat(brew.rating || 0);

            card.innerHTML = `
                <h3>${beansName}</h3>
                <p><strong>Method:</strong> ${brew.method}</p>
                <p><strong>Ratio:</strong> ${weight}g / ${volume}ml</p>
                <p><strong>Rating:</strong> <span class="rating" style="color: #d4af37;">${ratingStars}</span></p>
                <p><strong>Notes:</strong> ${brew.tastingNotes || 'None'}</p>
            `;
            logList.appendChild(card);
        });

        // Dynamic page title layout requirement
        document.title = `Brews: ${brews.length}`;

    } catch (error) {
        console.error('Error fetching logs:', error);
    }
}

// === FUNCTION 2: FORM SUBMISSION EVENT LISTENER ===
const brewForm = document.getElementById('brewForm');
if (brewForm) {
    brewForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop page reload

        // Extract input values matching your HTML IDs
        const beansInput = document.getElementById('title');
        const methodInput = document.getElementById('method');
        const weightInput = document.getElementById('coffeeWeight');
        const volumeInput = document.getElementById('waterVolume');
        const ratingInput = document.getElementById('rating');
        const notesInput = document.getElementById('tastingNotes');

        // Keys here match your backend Sequelize model columns exactly!
        const newBrew = {
            title: beansInput ? beansInput.value.trim() : '',
            method: methodInput ? methodInput.value.trim() : '',
            coffeeGrams: weightInput ? parseInt(weightInput.value) : 0,
            waterGrams: volumeInput ? parseInt(volumeInput.value) : 0,
            rating: ratingInput ? parseInt(ratingInput.value) : 0,
            tastingNotes: notesInput ? notesInput.value.trim() : ''
        };

        // Form Validation Check
        if (!newBrew.title || !newBrew.method || !newBrew.coffeeGrams || !newBrew.waterGrams || !newBrew.rating) {
            alert('Please fill out all required fields.');
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBrew)
            });

            if (response.ok) {
                brewForm.reset(); // Clear the form input fields safely
                await fetchBrews(); // Dynamically refresh your history logs list on screen
            } else {
                const errData = await response.json();
                console.error('Database rejection error:', errData);
                alert(`Error saving brew: ${errData.error || 'Check fields alignment.'}`);
            }
        } catch (error) {
            console.error('Network transport error while saving log:', error);
        }
    });
}

// === RUN ON STARTUP ===
fetchBrews();

