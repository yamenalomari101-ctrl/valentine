const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const hint = document.getElementById("hint");

let yesScale = 1;
let noAttempts = 0;
let dir = 1;

// حركة زر No يمين / شمال فقط
function moveNoSideways() {
  const x = dir * (18 + Math.random() * 22); // 18px إلى 40px
  dir *= -1;
  noBtn.style.setProperty("--noX", `${x}px`);
}

// تكبير زر Yes
function growYes() {
  noAttempts++;
  yesScale = Math.min(yesScale + 0.22, 2.8);
  yesBtn.style.setProperty("--yesScale", yesScale);

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

// هروب No
noBtn.addEventListener("mouseenter", moveNoSideways);
noBtn.addEventListener("mouseover", moveNoSideways);

noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    growYes();
    moveNoSideways();
  },
  { passive: false }
);

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  growYes();
  moveNoSideways();
});

// قلوب
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

// عند الضغط على Yes
yesBtn.addEventListener("click", () => {
  const interval = setInterval(createHeart, 140);
  setTimeout(() => clearInterval(interval), 3000);

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

// عند تحميل الصفحة
window.addEventListener("load", () => {
  moveNoSideways();
});
