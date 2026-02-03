const GAS_URL = "https://script.google.com/macros/s/AKfycbxTNdjRZLrJpJHJ2ocJz5Ym1dS89M9tZCpG5YuvUGwz9wSoPcKYzLlCVNu-jrFS_kqGxw/exec";

const form = document.getElementById("userForm");
const lixiBox = document.getElementById("lixiBox");
const submitBtn = document.getElementById("submitBtn");
const sound = document.getElementById("openSound");

let user = null;
let drawing = false;

/* INIT */
renderLixi();
lockLixi(true);

/* FORM SUBMIT */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (drawing) return;

  const stt = form.stt.value.trim();
  const nickname = form.nickname.value.trim();

  if (!stt || !nickname) {
    alert("Nhập thiếu thông tin");
    return;
  }

  submitBtn.disabled = true;

  try {
    const res = await fetch(
      `${GAS_URL}?action=status&stt=${stt}&nickname=${encodeURIComponent(nickname)}`
    ).then(r => r.json());

    if (!res.allowed) {
      alert("STT đã bóc hoặc không hợp lệ");
      submitBtn.disabled = false;
      return;
    }

    user = { stt, nickname };
    lockLixi(false);

  } catch (err) {
    alert("Không kết nối được server");
    submitBtn.disabled = false;
  }
});

/* DRAW */
async function drawLixi() {
  if (!user || drawing) return;

  drawing = true;
  lockLixi(true);

  sound.currentTime = 0;
  sound.play();

  setTimeout(async () => {
    try {
      const res = await fetch(
        `${GAS_URL}?action=draw&stt=${user.stt}&nickname=${encodeURIComponent(user.nickname)}`
      ).then(r => r.json());

      if (res.success) {
        alert(`🎉 ${user.nickname} nhận: ${res.reward}`);
      } else {
        alert("Rút thưởng thất bại");
      }

    } catch {
      alert("Lỗi kết nối khi rút thưởng");
    }
  }, 2000);
}

/* UI */
function renderLixi() {
  lixiBox.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.className = "lixi";
    div.innerHTML = `<img src="lixi.png" />`;
    div.addEventListener("click", drawLixi);
    lixiBox.appendChild(div);
  }
}

function lockLixi(state) {
  lixiBox.classList.toggle("locked", state);
}
