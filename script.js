
const phrases = [
  "Бог создавал Землю не 7 дней, а 6, седьмой он посвятил тебе",
  "Ты как луна, когда фотографируешь ее фото не может получить плохим, ведь камера не способна передать ее красоту в полной мере",
  "Я не верю в магию… но ты каждый раз как-то умудряешься меня очаровать",
  "Похоже, ты баг в системе: рядом с тобой всё остальное перестаёт быть важным",
  "В толковом словаре под словом 'Нежность' должна стоять твоя фотография",
  "Говорят, что писатель - это человек, в котором застрял мир, и я вижу удивительные миры внутри тебя"
];


const inviteText = "Раушан, предлагаю тебе встретиться в субботу в кино, а после поужинать 🙂";


let bag = [];
function refillBag() {
  bag = [...phrases];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
}

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");
const counter = document.getElementById("counter");

let spinning = false;
let angle = 0;
let finished = false;

function updateCounter() {
  counter.textContent = bag.length
    ? `Осталось фраз: ${bag.length}`
    : (finished ? "Готово 🙂" : "Фразы закончились 🙂");
}

function lockUI() {
  finished = true;
  spinBtn.disabled = true;
  spinBtn.textContent = "Готово";
  wheel.style.cursor = "default";
  updateCounter();
}

function spin() {
  if (spinning || finished) return;

  
  if (bag.length === 0) {
    alert(inviteText);
    lockUI();
    return;
  }

  spinning = true;

  const text = bag.pop();
  updateCounter();

  const extra = 360 * (3 + Math.floor(Math.random() * 3)); 
  const rnd = Math.floor(Math.random() * 360);
  angle += extra + rnd;

  wheel.style.transform = `rotate(${angle}deg)`;

  setTimeout(() => {
    result.textContent = text;
    spinning = false;

    
    if (bag.length === 0 && !finished) {
      setTimeout(() => {
        alert(inviteText);
        lockUI();
      }, 450);
    }
  }, 1800);
}


refillBag();
updateCounter();

spinBtn.addEventListener("click", spin);
wheel.addEventListener("click", spin);
