const cards = [
  { name: "FREE.", image: "0 free.png", meaning: "Mourn the losses. Celebrate what has been retained." },
  { name: "KLINKARI", image: "1 klinkari.png", meaning: "Give form to what is waiting to be expressed." },
  { name: "DEAR TOMORROW", image: "2 fearoftomorrow.png", meaning: "Trust the possibility of a future you cannot yet see." },
  { name: "बरतन", image: "3 बरतन.png", meaning: "Become the vessel that can hold, receive, and transform." },
  { name: "मन-मुकुंद", image: "4 मन-मुकुंद.png", meaning: "Stop the chase. Welcome transformation." },
  { name: "संतृप्ति", image: "5 santrupti.png", meaning: "Know when enough has become fullness." },
  { name: "POWER OF PERMISSION", image: "6 POWEROFPERMISSION.png", meaning: "What you permit yourself to become can change everything." },
  { name: "MONSTROSITY", image: "7 MONSTROSITY.png", meaning: "Good days end. And so do the bad days. Beware." },
  { name: "A LOSS", image: "8 a loss.png", meaning: "The season of mourning is over. Let presence reveal what was once concealed." },
  { name: "SUNFLOWER", image: "9 sunflower.png", meaning: "Turn toward what gives you light, even under the darkness." }
];

const welcomes = [
  { name: "Ganesha", mantra: "|| ॐ गं गणपतये नमः ||", icon: "ganapati.png" },
  { name: "Shanta Durga", mantra: "|| ॐ ऐं ह्रीं श्रीं ||", icon: "durga.png" },
  { name: "Hanuman", mantra: "|| ॐ हं हनुमते नमः ||", icon: "hanuman.png" }
];

const intro = document.querySelector("#intro");
const reading = document.querySelector("#reading");
const experience = document.querySelector(".experience");
const card = document.querySelector("#card");
const cardImage = document.querySelector("#cardImage");
const cardTitle = document.querySelector("#cardName");
const button = document.querySelector("#drawButton");
const cardCaption = document.querySelector("#cardCaption");

let bag = [];
let lastIndex = -1;
let busy = false;

function refill() {
  bag = cards.map((_, i) => i);

  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }

  if (bag.length > 1 && bag[bag.length - 1] === lastIndex) {
    [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
  }
}

function draw() {
  if (busy) return;
  busy = true;
  button.disabled = true;

  if (!bag.length) refill();

  const index = bag.pop();
  lastIndex = index;

  experience.classList.add("has-reading");
  intro.hidden = true;
  reading.hidden = false;

  const item = cards[index];
  cardTitle.textContent = item.name;
  cardImage.src = item.image;
  cardImage.alt = item.name;

  const existingMeaning = cardCaption.querySelector(".card-meaning");
  if (existingMeaning) existingMeaning.remove();

  const meaning = document.createElement("p");
  meaning.className = "card-meaning";
  meaning.textContent = item.meaning;
  cardCaption.appendChild(meaning);

  card.classList.remove("is-revealed");
  void card.offsetWidth;
  card.classList.add("is-revealed");

  setTimeout(() => {
    button.disabled = false;
    busy = false;
    button.focus();
  }, 600);
}

button.addEventListener("click", draw);

const welcome = document.querySelector("#welcome");
const welcomeStep = document.querySelector("#welcomeStep");
const welcomeIcon = document.querySelector("#welcomeIcon");
const welcomeMantra = document.querySelector("#welcomeMantra");
const welcomeNext = document.querySelector("#welcomeNext");
const welcomeBack = document.querySelector("#welcomeBack");

let welcomeIndex = 0;

function renderWelcome() {
  const item = welcomes[welcomeIndex];
  welcomeStep.textContent = "WELCOME · " + (welcomeIndex + 1) + " OF " + welcomes.length;

  const icon = document.createElement("img");
  icon.src = item.icon;
  icon.alt = item.name;

  welcomeIcon.innerHTML = "";
  welcomeIcon.appendChild(icon);
  welcomeMantra.textContent = item.mantra;
  welcomeBack.hidden = welcomeIndex === 0;
}

function finishWelcome() {
  try {
    localStorage.setItem("klinkari-welcome-v2", "seen");
  } catch {}

  welcome.hidden = true;
  experience.hidden = false;
  button.focus();
}

welcomeNext.addEventListener("click", () => {
  if (welcomeIndex < welcomes.length - 1) {
    welcomeIndex++;
    renderWelcome();
  } else {
    finishWelcome();
  }
});

welcomeBack.addEventListener("click", () => {
  if (welcomeIndex > 0) {
    welcomeIndex--;
    renderWelcome();
  }
});

try {
  if (localStorage.getItem("klinkari-welcome-v2") !== "seen") {
    welcome.hidden = false;
    experience.hidden = true;
    renderWelcome();
  }
} catch {
  welcome.hidden = false;
  experience.hidden = true;
  renderWelcome();
}
