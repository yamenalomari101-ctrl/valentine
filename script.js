const card = document.getElementById("card");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hint = document.getElementById("hint");

let yesScale = 1;
let noClicks = 0;

/* =========================
   زر NO يهرب فقط (ما يكبر)
========================= */
function moveNoButton() {
  const cardRect = card.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const pad = 20;

  const minX = pad;
  const maxX = cardRect.width - noRect.width - pad;
  const minY = 120;
  const maxY = cardRect.height - noRect.height - 80;

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// لما نقرب أو نلمس زر NO
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNoButton();
  },
  { passive: false }
);

/* =========================
   كل محاولة على NO:
   YES يكبر ويقرب
========================= */
noBtn.addEventListener("click", () => {
  noClicks++;

  // YES يكبر
  yesScale += 0.18;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.transition = "transform 0.25s ease";

  const msgs = [
    "ليش NO؟ 😿",
    "جربي YES 🙈",
    "قربت 😏",
    "YES عم تكبر 👀",
    "خلص واضح الجواب 😼"
  ];

  hint.textContent = msgs[Math.min(noClicks, msgs.length - 1)];

  moveNoButton();
});

/* =========================
   قلوب تطلع
========================= */
function createHeart() {
  const heart = document.createElement("div");
  heart.textContent = "💖";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = Math.random() * 20 + 16 + "px";
  heart.style.animation = "floatUp 3s linear";
  heart.style.zIndex = "9999";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

/* =========================
   لما YES تنكبس 💕
========================= */
yesBtn.addEventListener("click", () => {
  const interval = setInterval(createHeart, 160);
  setTimeout(() => clearInterval(interval), 3500);

  card.innerHTML = `
    <div style="display:grid;place-items:center;height:100%">
      <h2>YAY!!! 💕</h2>
      <p style="font-size:20px;">I knew it 😏</p>

      <img
        src="https://i.imgur.com/6ZQZ6ZP.jpg"
        alt="Cute cat with flowers"
        style="
          width:220px;
          border-radius:18px;
          box-shadow:0 10px 25px rgba(0,0,0,.25);
          margin:18px 0;
        "
      />

      <p style="font-size:18px;">Malak said YES 🌹🐱</p>
    </div>
  `;

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes floatUp {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(-100vh); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});

// أول ما الصفحة تفتح
window.addEventListener("load", moveNoButton);
window.addEventListener("resize", moveNoButton);
