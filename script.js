// COUNTDOWN TIMER
function initCountdown() {
    // Imposta la data del compleanno (19 novembre 2025)
    const birthdayDate = new Date('2025-11-19').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;
        
        if (distance < 0) {
            // Il compleanno è arrivato!
            triggerConfetti();
            document.getElementById('countdown-container').classList.add('hidden');
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Aggiorna splash screen
        document.getElementById('splashDays').textContent = String(days).padStart(2, '0');
        document.getElementById('splashHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('splashMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('splashSeconds').textContent = String(seconds).padStart(2, '0');
        
        // Aggiorna countdown principale
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // Mostra il countdown se ci sono giorni rimanenti
        if (days > 0) {
            document.getElementById('countdown-container').classList.remove('hidden');
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// CLOSE SPLASH SCREEN
function closeSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    splashScreen.classList.remove('active');
    document.body.classList.remove('splash-active');
    
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 800);
}

// CONFETTI EFFECT
function triggerConfetti() {
    const confettiCount = 50;
    const container = document.body;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#d4af37', '#f5e6e0', '#9ca89a', '#faf8f3'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '999';
        
        container.appendChild(confetti);
        
        const duration = Math.random() * 2 + 2;
        const xMove = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) translateX(${xMove}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// LIGHTBOX
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const img = element.querySelector('img');
    
    lightboxImage.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Chiudi lightbox con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// WISHES FORM
document.getElementById('wishForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('wishName').value;
    const message = document.getElementById('wishMessage').value;
    
    if (name.trim() && message.trim()) {
        const wishsList = document.getElementById('wishsList');
        
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.innerHTML = `
            <p class="wish-text">"${message}"</p>
            <p class="wish-author">— ${name}</p>
        `;
        
        wishsList.insertBefore(wishCard, wishsList.firstChild);
        
        // Reset form
        this.reset();
        
        // Feedback visivo
        const btn = this.querySelector('.btn-primary');
        const originalText = btn.textContent;
        btn.textContent = '✓ Inviato!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }
});

// SMOOTH SCROLL
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// INTERSECTION OBSERVER per animazioni al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Osserva tutti gli elementi animabili
document.querySelectorAll('.timeline-item, .gallery-item, .quality-card, .wish-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// INIT
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('splash-active');
    initCountdown();
});

// Aggiungi effetto parallasse leggero al hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// CANDLES GAME
function initCandlesGame() {
    const container = document.getElementById('candlesContainer');
    const candleCount = 10;
    
    for (let i = 0; i < candleCount; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.onclick = function() {
            this.classList.add('lit');
            checkAllCandlesLit();
        };
        container.appendChild(candle);
    }
}

function checkAllCandlesLit() {
    const candles = document.querySelectorAll('.candle');
    const allLit = Array.from(candles).every(c => c.classList.contains('lit'));
    
    if (allLit) {
        setTimeout(() => {
            triggerConfetti();
            alert('🎉 Tutte le candele sono accese! Auguri Mamma!');
        }, 500);
    }
}

function resetCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach(c => c.classList.remove('lit'));
}

// GIFTS GAME
const giftMessages = [
    "💝 Grazie per tutto l'amore che ci dai ogni giorno!",
    "🌟 Sei la donna più forte e bella che conosca!",
    "❤️ Il tuo sorriso illumina le nostre giornate!",
    "✨ Auguri per 60 anni meravigliosi!",
    "🎂 Che questo anno sia pieno di gioia!",
    "💐 Ti amiamo più di quanto le parole possano dire!"
];

function initGiftsGame() {
    const container = document.getElementById('giftsContainer');
    const gifts = ['🎁', '🎀', '💝', '🎊', '🎉', '🌹'];
    
    gifts.forEach((gift, index) => {
        const giftEl = document.createElement('div');
        giftEl.className = 'gift';
        giftEl.textContent = gift;
        giftEl.onclick = function() {
            showGiftMessage(giftMessages[index]);
            this.classList.add('revealed');
        };
        container.appendChild(giftEl);
    });
}

function showGiftMessage(message) {
    let modal = document.getElementById('giftModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'giftModal';
        modal.className = 'gift-message';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <p>${message}</p>
        <button onclick="closeGiftMessage()">Chiudi</button>
    `;
    modal.classList.add('show');
}

function closeGiftMessage() {
    const modal = document.getElementById('giftModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// MEMORY GAME
const memoryPairs = [
    { emoji: '❤️', label: 'Amore' },
    { emoji: '❤️', label: 'Amore' },
    { emoji: '🌟', label: 'Stella' },
    { emoji: '🌟', label: 'Stella' },
    { emoji: '💝', label: 'Regalo' },
    { emoji: '💝', label: 'Regalo' },
    { emoji: '🎂', label: 'Torta' },
    { emoji: '🎂', label: 'Torta' },
    { emoji: '✨', label: 'Magia' },
    { emoji: '✨', label: 'Magia' },
    { emoji: '🌸', label: 'Fiore' },
    { emoji: '🌸', label: 'Fiore' }
];

let memoryCards = [];
let flipped = [];
let matched = 0;

function initMemoryGame() {
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    
    // Shuffle
    const shuffled = [...memoryPairs].sort(() => Math.random() - 0.5);
    
    shuffled.forEach((pair, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.textContent = '?';
        card.dataset.emoji = pair.emoji;
        card.dataset.index = index;
        card.onclick = () => flipMemoryCard(card);
        grid.appendChild(card);
        memoryCards.push(card);
    });
}

function flipMemoryCard(card) {
    if (flipped.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.textContent = card.dataset.emoji;
        flipped.push(card);
        
        if (flipped.length === 2) {
            checkMemoryMatch();
        }
    }
}

function checkMemoryMatch() {
    const [card1, card2] = flipped;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matched += 2;
        flipped = [];
        
        if (matched === memoryCards.length) {
            setTimeout(() => {
                triggerConfetti();
                alert('🎉 Hai vinto! Complimenti!');
                initMemoryGame();
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '?';
            card2.textContent = '?';
            flipped = [];
        }, 800);
    }
}

// INIT GAMES
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('splash-active');
    initCountdown();
    initCandlesGame();
    initGiftsGame();
    initMemoryGame();
});
