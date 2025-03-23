// Function to load and display data from data.json
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Update profile information
        document.getElementById('profile-photo').src = data.profilePhoto;
        document.getElementById('name').textContent = data.name;
        document.getElementById('tagline').textContent = data.tagline;
        document.getElementById('about-text').textContent = data.about;

        // Update favorites
        document.getElementById('favorite-song').textContent = data.favorites.song;
        document.getElementById('favorite-movie').textContent = data.favorites.movie;
        document.getElementById('favorite-tvshow').textContent = data.favorites.tvShow;
        document.getElementById('favorite-game').textContent = data.favorites.game;
        document.getElementById('favorite-sport').textContent = data.favorites.sport;

        // Update photo gallery
        const galleryContainer = document.getElementById('photo-gallery');
        data.photos.forEach(photo => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = photo.description;
            
            galleryItem.appendChild(img);
            galleryContainer.appendChild(galleryItem);
        });

        // Add musical note animation
        addMusicalNotes();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Function to create floating musical notes animation
function addMusicalNotes() {
    const notes = ['♪', '♫', '♬', '♩', '♪', '♫', '♬'];
    const colors = ['#FFD700', '#D2691E', '#8B4513'];
    
    setInterval(() => {
        const note = document.createElement('div');
        note.className = 'floating-note';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.color = colors[Math.floor(Math.random() * colors.length)];
        note.style.left = Math.random() * 100 + 'vw';
        note.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        document.body.appendChild(note);
        
        // Remove note after animation
        setTimeout(() => {
            note.remove();
        }, 5000);
    }, 300);
}

// Add CSS for floating notes
const style = document.createElement('style');
style.textContent = `
    .floating-note {
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        animation: floatUp linear forwards;
        z-index: 1000;
    }

    @keyframes floatUp {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadData); 