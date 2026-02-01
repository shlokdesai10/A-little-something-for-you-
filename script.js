// ===== MODAL + MUSIC REFERENCES (IMPORTANT) =====
const modal = document.getElementById("yesModal");
const bgMusic = document.getElementById("bgMusic");

// ===== TYPEWRITER TEXT =====
const text = `
Hey Khushi Mandeep Desai 🤍

There’s something about you that has always stayed with me.
The way your hair looks when you smile,
the way your eyes quietly say so much without trying
it’s honestly beautiful.

You have this softness,
but also a strength that not everyone notices.
Being around you just feels calm,
like things make a little more sense.

I’ve made mistakes before,
but my feelings for you were never one of them.

So I just wanted to ask you something
not in a dramatic way,
not in a rushed way…

But from my heart.
`;

let i = 0;
const speed = 30;
const tw = document.getElementById("typewriter");

function typeText() {
  if (i < text.length) {
    tw.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
    i++;
    setTimeout(typeText, speed);
  } else {
    showProgress();
  }
}

typeText();

// ===== PROGRESS BAR =====
function showProgress() {
  document.getElementById("progressBox").classList.remove("hidden");

  let p = 0;
  const fill = document.getElementById("fill");
  const percent = document.getElementById("percent");

  const interval = setInterval(() => {
    p++;
    fill.style.width = p + "%";
    percent.innerText = p + "%";

    if (p === 100) {
      clearInterval(interval);
      showFinal();
    }
  }, 25);
}

function showFinal() {
  document.getElementById("final").classList.remove("hidden");
}

// ===== FLOATING HEARTS =====
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const heartEmojis = ["💛", "❤️", "💖", "💌"];
  heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 16 + Math.random() * 20 + "px";
  heart.style.opacity = 0.8 + Math.random() * 0.2;
  heart.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 600);

// ===== SPARKLES =====
const sparkleContainer = document.createElement("div");
sparkleContainer.className = "hearts";
document.body.appendChild(sparkleContainer);

for (let i = 0; i < 25; i++) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.top = Math.random() * 100 + "vh";
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.animationDuration = 1 + Math.random() * 2 + "s";
  sparkleContainer.appendChild(sparkle);
}

// ===== PETALS =====
function startPetals() {
  const container = document.getElementById("petals-container");
  container.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.textContent = "🌸";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 5 + Math.random() * 5 + "s";
    petal.style.fontSize = 14 + Math.random() * 10 + "px";
    container.appendChild(petal);
  }
}

// ===== MAIN BUTTON HANDLER =====
function sendResponse(choice) {
  console.log("Button clicked:", choice);

  // Google Form submit
  const input = document.getElementById("formInput");
  const form = document.getElementById("googleForm");
  input.value = choice;
  form.submit();

  if (choice.includes("Yes")) {
    modal.classList.add("show");
    startPetals();

    bgMusic.currentTime = 0;
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {});
  } else {
    document.getElementById("response").innerText =
      "That’s okay 🤍 Take all the time you need.";
  }

  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = "0.6";
  });
}

// ===== CLOSE MODAL =====
function closeModal() {
  modal.classList.remove("show");

  bgMusic.pause();
  bgMusic.currentTime = 0;

  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = "1";
  });
}

// ===== CLICK OUTSIDE TO CLOSE =====
function forceClose(e) {
  if (e.target.id === "yesModal") {
    closeModal();
  }
}
