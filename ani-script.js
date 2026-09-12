"use strict";

const titleScreen = document.getElementById("titleScreen");
const bubbleLayer = document.getElementById("bubbleLayer");
const pressStart = document.getElementById("pressStart");

const MAIN_SCREEN = "main.html";

function createBubbles(count = 18) {
  if (!bubbleLayer) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const bubble = document.createElement("span");
    bubble.className = "bubble";

    const size = Math.floor(10 + Math.random() * 42);
    const left = Math.random() * 100;
    const duration = 5 + Math.random() * 7;
    const delay = -(Math.random() * duration);
    const opacity = 0.35 + Math.random() * 0.55;

    bubble.style.left = `${left}%`;
    bubble.style.setProperty("--size", `${size}px`);
    bubble.style.setProperty("--duration", `${duration}s`);
    bubble.style.setProperty("--delay", `${delay}s`);
    bubble.style.setProperty("--opacity", opacity.toFixed(2));

    bubble.style.setProperty("--drift1", `${-35 + Math.random() * 70}px`);
    bubble.style.setProperty("--drift2", `${-55 + Math.random() * 110}px`);
    bubble.style.setProperty("--drift3", `${-45 + Math.random() * 90}px`);
    bubble.style.setProperty("--drift4", `${-70 + Math.random() * 140}px`);

    fragment.appendChild(bubble);
  }

  bubbleLayer.appendChild(fragment);
}

function startGame() {
  if (!pressStart || titleScreen.classList.contains("starting")) {
    return;
  }

  titleScreen.classList.add("starting");

  window.setTimeout(() => {
    window.location.href = MAIN_SCREEN;
  }, 550);
}

createBubbles();

if (pressStart) {
  pressStart.addEventListener("click", startGame);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Enter" || event.code === "Space") {
    event.preventDefault();
    startGame();
  }
});
