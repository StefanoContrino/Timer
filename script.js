// ------------------- COUNTDOWN -------------------
const targetDate = new Date("2025-10-08T16:30:00"); // Data obiettivo
const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");

// Aggiorna il countdown
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

updateCountdown();
setInterval(updateCountdown, 1000);

// ------------------- MESSAGGI SCHEDULATI -------------------
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

let shownMessages = new Set();

function getCurrentDateTimeKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function checkAndShowMessage() {
  const currentKey = getCurrentDateTimeKey();

  if (scheduledMessages[currentKey] && !shownMessages.has(currentKey)) {
    messageEl.textContent = scheduledMessages[currentKey];
    shownMessages.add(currentKey);
    return;
  }

  if (shownMessages.size === 0) {
    const keys = Object.keys(scheduledMessages).sort();
    for (let i = keys.length - 1; i >= 0; i--) {
      const scheduledTime = new Date(keys[i].replace(" ", "T"));
      if (scheduledTime <= new Date()) {
        messageEl.textContent = scheduledMessages[keys[i]];
        shownMessages.add(keys[i]);
        break;
      }
    }
  }
}

checkAndShowMessage();
setInterval(checkAndShowMessage, 30000);

// ------------------- SFONDO AUTOMATICO -------------------
function updateBackgroundClass() {
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

updateBackgroundClass();
setInterval(updateBackgroundClass, 10 * 60 * 1000); // ogni 10 minuti

// ------------------- PLAYER AUDIO -------------------
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const audioPlayer = document.getElementById("background-music");

// Play / Pause
playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸️ Pause";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️ Play";
  }
});

// Durata totale
audioPlayer.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audioPlayer.duration);
});

// Aggiorna barra e tempo corrente
audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

// Trascina barra progresso
progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}






