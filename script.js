const modal = document.getElementById("yesModal");
const bgMusic = document.getElementById("bgMusic");

const text = `
Hey Khushi Mandeep Desai 🤍

Loving you was never loud or sudden.
It didn’t happen in one moment —
it happened slowly,
through every conversation,
every small laugh,
every time you stayed when you didn’t have to.

Somewhere along the way,
you became my comfort,
my safe place,
the one person I look for even when I don’t realise I’m searching.

It’s in the way your name feels familiar on my screen,
in the way my day somehow feels incomplete without you in it,
in the way I find myself wanting to share even the smallest things with you.

And I know we’ve had our moments,
i've made mistakes,
i've hurt you in ways i never meant to…
but through all of that,
my feelings for you never really left.

Because loving you was never something temporary for me.

You make things feel softer.
You make chaos feel calm.
You make ordinary days feel like they matter.

And if I’m being honest…
having you in my life just feels right in a way nothing else ever has.

So this isn’t me rushing anything,
or asking for something new.

This is just me choosing you again,
with everything I feel,
and everything I am.
(And i am going to be your first kiss remember this)
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

/* ❤️ Hearts */
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const heartEmojis = ["💛", "❤️", "💖", "💌"];
  heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 16 + Math.random() * 20 + "px";
  heart.style.opacity = 0.8 + Math.random() * 0.2;
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 600);

/* 💬 BUTTON HANDLER */
function sendResponse(choice) {
  const input = document.getElementById("formInput");
  const form = document.getElementById("googleForm");

  input.value = choice;
  form.submit();

  if (choice.includes("Yes")) {
    setTimeout(() => {
      openYesModal();
      startPetals();

      const music = document.getElementById("bgMusic");
      music.volume = 0.3;
      music.currentTime = 0;
      music.play().catch(() => {});
    }, 500);
  } else {
    document.getElementById("response").innerText =
      "That’s okay 🤍 Take all the time you need.";
  }

  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = "0.6";
  });
}

/* 🌸 PETALS */
function startPetals() {
  const container = document.getElementById("petals-container");

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

/* ✅ MODAL CONTROL */
function openYesModal() {
  modal.classList.add("show");

  bgMusic.currentTime = 0;
  bgMusic.volume = 0.4;
  bgMusic.play().catch(() => {});
}


function closeModal() {
  // hide modal
  modal.classList.remove("show");

  // stop music
  bgMusic.pause();
  bgMusic.currentTime = 0;

  // reset petals
  const petals = document.getElementById("petals-container");
  if (petals) petals.innerHTML = "";

  // re-enable buttons
  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  });
}
// Close when clicking outside modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close button
document.getElementById("closeModalBtn").addEventListener("click", closeModal);
