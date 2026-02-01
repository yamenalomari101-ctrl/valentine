const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.querySelector(".card");

let yesScale = 1;

// لما يكبس No
noBtn.addEventListener("click", () => {
  yesScale += 0.25;

  // كبر زر Yes
  yesBtn.style.transform = `scale(${yesScale})`;

  // خلّي زر Yes يطلع فوق
  yesBtn.style.zIndex = 10;
});

// لما يكبس Yes
yesBtn.addEventListener("click", () => {
  card.innerHTML = `
    <h2>YAY!!! 💕💞</h2>
    <p>I knew it 😌</p>
    <img 
      src="cat-rose.jpg" 
      alt="Cat with rose" 
      style="
        width: 220px;
        border-radius: 20px;
        margin: 16px 0;
      "
    />
    <p><strong>Malak said YES 🌹🐱</strong></p>
  `;
});
