document.addEventListener("DOMContentLoaded", () => {

  const card = document.getElementById("card");
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const hint = document.getElementById("hint");

  let yesScale = 1;
  let noClicks = 0;

  function moveNoButton() {
    const cardRect = card.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();

    const maxX = cardRect.width - noRect.width - 20;
    const maxY = cardRect.height - noRect.height - 80;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  }

  // يخلي زر No يهرب (موبايل + كمبيوتر)
  ["mouseenter", "mouseover", "touchstart"].forEach(event => {
    noBtn.addEventListener(event, (e) => {
      e.preventDefault();
      moveNoButton();
    }, { passive: false });
  });

  // لما ينكبس No يكبر Yes
  noBtn.addEventListener("click", () => {
    noClicks++;
    yesScale += 0.2;
    yesBtn.style.transform = `scale(${yesScale})`;

    const msgs = [
      "No is shy 🙈",
      "Still no? 😭",
      "Malak please 😩",
      "You're teasing 😼",
      "YES is HUGE 👀"
    ];
    hint.textContent = msgs[Math.min(noClicks, msgs.length - 1)];

    moveNoButton();
  });

  // قلوب
  function heart() {
    const h = document.createElement("div");
    h.textContent = "💖";
    h.style.position = "fixed";
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "-20px";
    h.style.fontSize = "24px";
    h.style.animation = "floatUp 3s linear";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }

  // Yes
  yesBtn.addEventListener("click", () => {
    const i = setInterval(heart, 150);
    setTimeout(() => clearInterval(i), 3000);

    card.innerHTML = `
      <div style="display:grid;place-items:center;height:100%">
        <h2>YAY!!! 💕</h2>
        <p style="font-size:20px;">I knew it 😏</p>
        <img src="https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif"
             style="width:220px;border-radius:16px;margin:15px 0;">
        <p>Malak said YES 🌹😼</p>
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

});
