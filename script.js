// Imposta la data e ora dell'appuntamento
const targetDate = new Date("2025-10-08T16:30:00"); // Esempio: 12 giugno ore 20:30

const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");




// Messaggi con date e orari precisi (formato: "YYYY-MM-DD HH:MM")
const scheduledMessages = {
  "2025-09-16 17:00": "Siamo di nuovo connessi dal codice, e tra poco lo saremo ancora di più.",
  "2025-09-17 17:00": "Quale esperienza ti ha trasformata più di tutte, anche se all’epoca non lo sapevi?",
  "2025-09-18 17:00": "Qual è una parte di te che mostri solo a poche persone e perché quelle poche?",
  "2025-09-19 17:00": "Che significato ha per te la parola casa — è un luogo, una persona, un tempo?",
  "2025-09-20 17:00": "In quali momenti ti senti davvero libera, e cosa impedisce quella libertà negli altri momenti?",
  "2025-09-21 17:00": "Quale valore provi a difendere anche quando farlo è difficile o scomodo?",
  "2025-09-22 17:00": "C’è una ferita che, una volta guarita, ti ha insegnato qualcosa di prezioso?",
  "2025-09-23 17:00": "Se la tua infanzia fosse un film, quale scena sarebbe la più importante e perché?",
  "2025-09-24 17:00": "Qual è un desiderio o una speranza che non hai mai detto ad alta voce?",
  "2025-09-25 17:00": "Raccontami di una volta in cui hai dubitato di te stessa: cosa ti ha fatto rialzare?",
  "2025-09-26 17:00": "Quale storia su di te vorresti smettere di raccontare — quella che ti limita — e come la riscriveresti?",
  "2025-09-27 17:00": "Quale ricordo ti sorprende ogni volta che lo richiami alla mente?",
  "2025-09-28 17:00": "Cosa vorresti che la gente capisse di te senza che tu debba spiegartelo?",
  "2025-09-29 17:00": "Se potessi abbandonare un’abitudine e prenderne subito un’altra utile, quali sarebbero?",
  "2025-09-30 17:00": "Cosa consideri sacro o intoccabile nella tua vita, e perché?",
  "2025-10-01 17:00": "Qual è l’amore più grande che senti — non per forza romantico — e come si manifesta?",
  "2025-10-02 17:00": "Raccontami di una scelta in cui hai dovuto decidere tra testa e cuore: cosa hai scelto e come ti è andata?",
  "2025-10-03 17:00": "Se potessi dire qualcosa alla te di dieci anni fa, cosa le diresti per confortarla o scuoterla?",
  "2025-10-04 17:00": "Qual è una verità sulle relazioni che hai imparato a tue spese?",
  "2025-10-05 17:00": "Hai un rimpianto che oggi trasformeresti in lezione? Qual è e come lo useresti?",
  "2025-10-06 17:00": "Quando ti senti smarrita, qual è la cosa concreta che usi per ritrovarti?",
  "2025-10-07 17:00": "Cosa ti fa sentirti davvero vista e compresa — un gesto, una frase, un silenzio?",
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






