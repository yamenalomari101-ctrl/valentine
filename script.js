const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const hint = document.getElementById("hint");

let yesScale = 1;
let noAttempts = 0;

// خلي زر No يهرب داخل الكارد
function moveNoButton() {
  const cardRect = card.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const pad = 16;

  // حدود الحركة داخل الكارد
  const minX = pad;
  const maxX = cardRect.width - noRect.width - pad;
  const minY = 120; // عشان ما يطلع فوق العنوان
  const maxY = cardRect.height - noRect.height - 90; // عشان ما ينزل برا

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// كبّري زر Yes
function growYes() {
  noAttempts++;
  yesScale += 0.22;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = 10;

  if (hint) {
    const msgs = [
      'Try to click "No" 😼',
      "Nope 😭",
      "Malak please 😩",
      "You're teasing 🙈",
      "Okay… just press YES 😌"
    ];
    hint.textContent = msgs[Math.min(noAttempts, msgs.length - 1)];
  }
}

// هروب عند الاقتراب (موبايل + كمبيوتر)
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    growYes();
    moveNoButton();
  },
  { passive: false }
);

// لو قدر يضغط No: كبّر Yes وخلّي No يهرب كمان
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  growYes();
  moveNoButton();
});

// قلوب تطلع
function createHeart() {
  const heart = document.createElement("div");
  heart.textContent = "💖";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = Math.random() * 18 + 18 + "px";
  heart.style.animation = "floatUp 3s linear";
  heart.style.zIndex = "9999";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

// لما Yes ينضغط
yesBtn.addEventListener("click", () => {
  // قلوب
  const interval = setInterval(createHeart, 140);
  setTimeout(() => clearInterval(interval), 3000);

  // صفحة النتيجة مع صورة cat-rose.jpg
  card.innerHTML = `
    <div style="display:grid;place-items:center;height:100%;gap:10px">
      <h2 style="margin:0">YAY!!! 💕💞</h2>
      <p style="margin:0;font-size:20px">I knew it 😌</p>
      <img src="cat-rose.jpg" alt="Cat with rose"
        style="width:240px;max-width:80%;border-radius:20px;margin:10px 0;" />
      <p style="margin:0;font-weight:700">Malak said YES 🌹🐱</p>
    </div>
  `;
});

// أنيميشن القلوب
const style = document.createElement("style");
style.textContent = `
@keyframes floatUp {
  from { transform: translateY(0); opacity: 1; }
  to   { transform: translateY(-100vh); opacity: 0; }
}
`;
document.head.appendChild(style);

// أول ما الصفحة تفتح
window.addEventListener("load", () => {
  moveNoButton();
});
window.addEventListener("resize", moveNoButton);
