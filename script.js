const sttInput = document.getElementById("sttInput");
const nameInput = document.getElementById("nameInput");
const submitBtn = document.getElementById("submitBtn");

const lixiCard = document.getElementById("lixiCard");
const lixiGrid = document.getElementById("lixiGrid");
const lockOverlay = document.getElementById("lockOverlay");

const modal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const closeModal = document.getElementById("closeModal");

const tntSound = document.getElementById("tntSound");

let isUnlocked = false;
let hasPicked = false;

/* ===== render 9 lì xì ===== */
for (let i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.className = "lixi";
  div.innerHTML = `<img src="images/lixi.png" alt="lixi">`;
  div.addEventListener("click", () => pickLixi(i));
  lixiGrid.appendChild(div);
}

/* ===== submit form ===== */
submitBtn.onclick = () => {
  const stt = sttInput.value.trim();
  const name = nameInput.value.trim();

  if (!stt || !name) {
    alert("Nhập đầy đủ STT và Nickname");
    return;
  }

  isUnlocked = true;
  hasPicked = false;

  lixiCard.classList.remove("locked");
  lockOverlay.style.display = "none";
};

/* ===== pick lixi ===== */
function pickLixi(index) {
  if (!isUnlocked || hasPicked) return;

  hasPicked = true;
  tntSound.currentTime = 0;
  tntSound.play();

  // giả lập kết quả
  const money = Math.floor(Math.random() * 90 + 10) * 1000;

  setTimeout(() => {
    resultText.textContent = `Bạn nhận được ${money.toLocaleString()} VNĐ`;
    modal.classList.remove("hidden");
  }, 6000);
}

/* ===== close modal & reset ===== */
closeModal.onclick = () => {
  modal.classList.add("hidden");

  // reset cho người tiếp theo
  sttInput.value = "";
  nameInput.value = "";
  isUnlocked = false;

  lixiCard.classList.add("locked");
  lockOverlay.style.display = "flex";
};
