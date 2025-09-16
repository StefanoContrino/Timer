// Imposta la data e ora dell'appuntamento
const targetDate = new Date("2025-10-08T16:30:00"); // Esempio: 12 giugno ore 20:30

const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");




// Messaggi con date e orari precisi (formato: "YYYY-MM-DD HH:MM")
const scheduledMessages = {
  "2025-09-16 14:00": "Siamo di nuovo connessi dal codice",
};


let shownMessages = new Set(); // Per evitare ripetizioni

// Funzione per ottenere la data e ora attuali in formato "YYYY-MM-DD HH:MM"
function getCurrentDateTimeKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Controlla ogni 30 secondi se è il momento di mostrare un messaggio
setInterval(() => {
  const currentKey = getCurrentDateTimeKey();
  if (scheduledMessages[currentKey] && !shownMessages.has(currentKey)) {
    messageEl.textContent = scheduledMessages[currentKey];
    shownMessages.add(currentKey); // Evita di mostrarlo più volte
  } else if (scheduledMessages[currentKey]) {
    messageEl.textContent = scheduledMessages[currentKey];
  }
}, 30000);


// Aggiorna il timer ogni secondo
function checkAndShowMessage() {
  const now = new Date();
  const currentKey = getCurrentDateTimeKey();

  // Se c'è un messaggio esatto per questo momento
  if (scheduledMessages[currentKey] && !shownMessages.has(currentKey)) {
    messageEl.textContent = scheduledMessages[currentKey];
    shownMessages.add(currentKey);
    return;
  }

  // Cerca il messaggio più recente (solo se nessun altro è stato mostrato)
  if (shownMessages.size === 0) {
    const keys = Object.keys(scheduledMessages).sort(); // Ordina le chiavi
    for (let i = keys.length - 1; i >= 0; i--) {
      const scheduledTime = new Date(keys[i].replace(" ", "T"));
      if (scheduledTime <= now) {
        messageEl.textContent = scheduledMessages[keys[i]];
        shownMessages.add(keys[i]);
        break;
      }
    }
  }
}

checkAndShowMessage();              // Controllo iniziale al primo caricamento
setInterval(checkAndShowMessage, 30000);  // Controlli ogni 30 secondi

// Funzione per aggiornare il countdown
function updateCountdown() {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    countdownEl.textContent = "È arrivato il momento! ✨";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  countdownEl.textContent = `${days} giorni, ${hours} ore, ${minutes} minuti, ${seconds} secondi`;
}

// Avvia il countdown ogni secondo
setInterval(updateCountdown, 1000);
updateCountdown(); // Aggiorna subito alla prima visualizzazione

// Cambia lo sfondo in base all'orario
function updateBackground() {
  const hour = new Date().getHours();
  let bg;

  if (hour >= 6 && hour < 12) {
    // Mattina
    bg = 'linear-gradient(135deg, #FFFAE3, #FFD194)';
  } else if (hour >= 12 && hour < 18) {
    // Pomeriggio
    bg = 'linear-gradient(135deg, #a1c4fd, #c2e9fb)';
  } else if (hour >= 18 && hour < 21) {
    // Sera
    bg = 'linear-gradient(135deg, #fbc1cc, #fa99b2)';
  } else {
    // Notte
    bg = 'linear-gradient(135deg, #2c3e50, #4ca1af)';
  }

  document.body.style.background = bg;
}

// Chiama subito e poi ogni minuto per aggiornare sfondo
updateBackground();
setInterval(updateBackground, 60000);

// Cambia lo sfondo in base all'orario
function updateBackground() {
  const hour = new Date().getHours();
  document.body.classList.remove('morning', 'afternoon', 'evening', 'night');

  if (hour >= 6 && hour < 12) {
    document.body.classList.add('morning');
  } else if (hour >= 12 && hour < 17) {
    document.body.classList.add('afternoon');
  } else if (hour >= 17 && hour < 21) {
    document.body.classList.add('evening');
  } else {
    document.body.classList.add('night');
  }
}

// Esegui subito e ogni 10 minuti per aggiornare sfondo se serve
updateBackground();
setInterval(updateBackground, 10 * 60 * 1000);

// Gestione musica
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

musicToggle.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicToggle.textContent = '🔊'; // icona volume acceso
  } else {
    backgroundMusic.pause();
    musicToggle.textContent = '🎵'; // icona volume spento
  }
});

// Timer (semplice conto alla rovescia o conteggio, qui esempio conto avanti)
let startTime = Date.now();
const timerEl = document.getElementById('timer');

function updateTimer() {
  let elapsed = Date.now() - startTime;
  let totalSeconds = Math.floor(elapsed / 1000);
  let hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  let minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  let seconds = (totalSeconds % 60).toString().padStart(2, '0');
  timerEl.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTimer, 1000);


// Audio play/pause button
const audio = document.getElementById('romantic-music');
const btnAudio = document.getElementById('audio-control');

btnAudio.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    btnAudio.textContent = '⏸️ Pause';
  } else {
    audio.pause();
    btnAudio.textContent = '▶️ Play';
  }
});


// Array di sfondi da usare (modifica gli URL con quelli che vuoi)
const backgrounds = [
  'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80")', // alba
  'url("https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1920&q=80")', // pomeriggio
  'url("https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1920&q=80")', // sera
];

// Funzione che imposta lo sfondo in base all'ora corrente
function aggiornaSfondo() {
  const ora = new Date().getHours();
  let indexSfondo;

  if (ora >= 6 && ora < 12) {
    indexSfondo = 0; // mattina
  } else if (ora >= 12 && ora < 18) {
    indexSfondo = 1; // pomeriggio
  } else {
    indexSfondo = 2; // sera/notte
  }

  document.body.style.backgroundImage = backgrounds[indexSfondo];
}

// Esegui subito al caricamento
aggiornaSfondo();

// Aggiorna ogni 30 minuti per sicurezza (in modo da cambiare lo sfondo se l’utente rimane aperto)
setInterval(aggiornaSfondo, 30 * 60 * 1000);


setInterval(updateCountdown, 1000);




