// Imposta la data e ora dell'appuntamento
const targetDate = new Date("2025-06-20T18:30:00"); // Esempio: 12 giugno ore 20:30

const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");




// Messaggi con date e orari precisi (formato: "YYYY-MM-DD HH:MM")
const scheduledMessages = {
  "2025-06-10 21:00": "Oggi è la prima notte in cui il codice ci connette...",
  "2025-06-11 06:30": "Buongiorno! Come stai oggi? 💖",
  "2025-06-11 12:00": "Eiii, come va a lavoro? Buon appetito!",
  "2025-06-11 19:30": "Il mio cuore ti circonda beato, battendo per te", // Verso 1 - 1/4
  "2025-06-11 21:00": "Ti penso tanto sai? Buonanotte, baci",
  "2025-06-12 06:30": "Sai che giorno è? Mancano 8 giorni! ✨",
  "2025-06-12 08:00": "Sente il tuo riso, mentre mi guardi smarrita", // Verso 1 - 2/4
  "2025-06-12 12:00": "Indovina un po'? È probabile che io ti stia pensando. ❤️",
  "2025-06-12 13:30": "Ricerchi con me una via che mai trovasti", // Verso 1 - 3/4
  "2025-06-12 21:00": "Anche oggi ti auguro una buonissima notte, bacioni!",
  "2025-06-12 22:00": "Ma che insieme abbiamo costruito senza sosta", // Verso 1 - 4/4
  "2025-06-13 06:30": "Oggi ha dormito bene? Io sì sapendo che manca una sola settimana!",
  "2025-06-13 10:30": "Scavalco le montagne per vederne i panorami", // Verso 2 - 1/4
  "2025-06-13 12:00": "Spero che il tuo pranzo sia buono. In ogni caso ti abbraccio forte",
  "2025-06-13 15:30": "Scruto la neve che delicata ricopre le vette", // Verso 2 - 2/4
  "2025-06-13 21:00": "Stanotte le hai viste le stelle? Io ne sto guardando una adesso",
  "2025-06-14 06:30": "Buongiornooo, anche oggi siamo felici!",
  "2025-06-14 09:30": "Ma son le stesse alture che adesso mi copron la veduta", // Verso 2 - 3/4
  "2025-06-14 12:00": "Sai che oggi pensavo proprio a te? ❤️",
  "2025-06-14 16:30": "Di colei che sogno ogni notte, rannicchiato nel mio giaciglio", // Verso 2 - 4/4
  "2025-06-14 21:00": "Ma hai visto che mancano 6 giorni???",
  "2025-06-14 22:30": "Sento freddo in questa mattina uggiosa", // Verso 3 - 1/4
  "2025-06-15 06:30": "Buongiorno! Anche oggi un passo più vicino a vederti 🩷",
  "2025-06-15 12:00": "Stai mangiando? Mi piace immaginarti mentre sorridi tra un boccone e l’altro.",
  "2025-06-15 17:30": "Mentre scaldo le mie mani con un fiato pesante", // Verso 3 - 2/4
  "2025-06-15 21:00": "Chiudi gli occhi e pensa a me... magari stiamo sognando la stessa cosa.",
  "2025-06-16 06:30": "C’è qualcosa nell’aria stamattina… forse sei tu nei miei pensieri.",
  "2025-06-16 10:30": "Ricerco la tua anima tra gli alberi spogli di foglie", // Verso 3 - 3/4
  "2025-06-16 12:00": "Che tu sia stanca, felice o distratta: io sono lì, invisibile accanto a te.",
  "2025-06-16 19:30": "E parlo con gli animali che magari t'hanno vista passare", // Verso 3 - 4/4
  "2025-06-16 21:00": "Stanotte non contar le pecore… pensa a noi. Funziona meglio.",
  "2025-06-17 06:30": "Hai notato che il cielo sembra più bello quando stai per incontrare qualcuno di speciale?",
  "2025-06-17 12:00": "Se oggi è difficile, ricordati che mancano solo due giorni… e io ci sarò.",
  "2025-06-17 15:30": "Son arrivato finalmente oltre i monti bianchi e colossali", // Verso 4 - 1/4
  "2025-06-17 21:00": "Un altro giorno vola via, ma quello che sento per te resta. Buonanotte.",
  "2025-06-18 06:30": "Punultima alba senza di te davanti agli occhi. Che strano dirlo…",
  "2025-06-18 12:00": "Ho provato a distrarmi oggi, ma ogni cosa mi riportava a te.",
  "2025-06-18 19:30": "E ti cerco di nuovo, tra città spoglie di amore", // Verso 4 - 2/4
  "2025-06-18 21:00": "Domani ne mancherà solo uno... 💫",
  "2025-06-19 06:30": "Buongiorno, il sole ha un colore diverso quando penso a te.",
  "2025-06-19 12:00": "Oggi ti mando un abbraccio che supera le distanze.",
  "2025-06-19 18:30": "Ancora mi smarrisco, come se qui tu non esistessi", // Verso 4 - 3/4
  "2025-06-19 21:00": "Che stelle stai guardando? Io sto cercando la tua preferita.",
  "2025-06-20 06:30": "Eiiiiii, lo sai che finito qui io parto vero?",
  "2025-06-20 08:30": "E mi rendo conto, solo ora, che le montagne erano dentro di me", // Verso 4 - 4/4
  "2025-06-20 12:00": "Sono per strada, partito da poco e con la testa piena di te.",
  "2025-06-20 18:00": "Sto arrivando, sono dietro l'angolo e già ti vedo...",
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

