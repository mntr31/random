// Function to load and display data from data.json
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Update profile information
        document.getElementById('profile-photo').src = data.profilePhoto;
        document.getElementById('name').textContent = data.name.gujarati;
        document.getElementById('name').setAttribute('data-english', data.name.english);
        document.getElementById('tagline').textContent = data.tagline.gujarati;
        document.getElementById('tagline').setAttribute('data-english', data.tagline.english);
        document.getElementById('about-text').textContent = data.about.gujarati;
        document.getElementById('about-text').setAttribute('data-english', data.about.english);

        // Update favorites
        document.getElementById('favorite-song').textContent = data.favorites.song.gujarati;
        document.getElementById('favorite-song').setAttribute('data-english', data.favorites.song.english);
        document.getElementById('favorite-movie').textContent = data.favorites.movie.gujarati;
        document.getElementById('favorite-movie').setAttribute('data-english', data.favorites.movie.english);
        document.getElementById('favorite-tvshow').textContent = data.favorites.tvShow.gujarati;
        document.getElementById('favorite-tvshow').setAttribute('data-english', data.favorites.tvShow.english);
        document.getElementById('favorite-game').textContent = data.favorites.game.gujarati;
        document.getElementById('favorite-game').setAttribute('data-english', data.favorites.game.english);
        document.getElementById('favorite-sport').textContent = data.favorites.sport.gujarati;
        document.getElementById('favorite-sport').setAttribute('data-english', data.favorites.sport.english);

        // Update photo gallery
        const galleryContainer = document.getElementById('photo-gallery');
        data.photos.forEach(photo => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = photo.description.gujarati;
            
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
    const colors = ['#000000', '#333333', '#666666'];
    
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
            opacity: 0.1;
        }
        25% {
            transform: translateY(2px) rotate(1deg);
            opacity: 0.15;
        }
        50% {
            transform: translateY(-2px) rotate(-1deg);
            opacity: 0.2;
        }
        75% {
            transform: translateY(1px) rotate(-2deg);
            opacity: 0.15;
        }
        100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
        }
    }
`;
document.head.appendChild(style);

// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadData); 