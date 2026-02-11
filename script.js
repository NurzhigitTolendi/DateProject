const compliments = [
  "Ты очень искренняя — это редкость.",
  "С тобой легко и спокойно.",
  "Ты умеешь поддержать так, что сразу легче.",
  "Ты делаешь мир вокруг добрее.",
  "Ты невероятно умная и внимательная.",
  "С тобой даже обычный день становится особенным."
];

const invite = "Предлагаю тебе встретиться в субботу в кино, а после поужинать.";

const startBtn = document.getElementById("startBtn");
const startWrap = document.getElementById("startWrap");
const game = document.getElementById("game");

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");
const counter = document.getElementById("counter");

const modal = document.getElementById("modal");
const inviteText = document.getElementById("inviteText");
const closeModalBtn = document.getElementById("closeModalBtn");

let bag = [];
let spinning = false;
let angle = 0;

function refillBag() {
  bag = [...compliments];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
}

function updateCounter() {
  counter.textContent = bag.length > 0 ? `Осталось: ${bag.length}` : "";
}

function openModal() {
  inviteText.textContent = invite;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function spin() {
  if (spinning) return;

  if (bag.length === 0) {
    openModal();
    return;
  }

  spinning = true;

  const text = bag.pop();
  updateCounter();

  const extra = 360 * (3 + Math.floor(Math.random() * 3)); // 3–5 оборотов
  const rnd = Math.floor(Math.random() * 360);
  angle = angle + extra + rnd;

  wheel.style.transition = "transform 1.8s cubic-bezier(.17,.67,.18,1)";
  wheel.style.transform = `rotate(${angle}deg)`;

  setTimeout(() => {
    result.textContent = text;
    spinning = false;

    if (bag.length === 0) {
      setTimeout(openModal, 700);
    }
  }, 1850);
}

startBtn.addEventListener("click", () => {
  refillBag();
  updateCounter();
  startWrap.classList.add("hidden");
  game.classList.remove("hidden");
  result.textContent = "Кликай по колесу 🙂";
});

wheel.addEventListener("click", spin);
spinBtn.addEventListener("click", spin);

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
