// 🌸 Sakura Petals Engine (Global, Safe for All Pages)

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sakura-container");
  if (!container) return;

  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "sakura";

    // Random horizontal start
    petal.style.left = Math.random() * 100 + "vw";

    // Random wind drift
    const drift = (Math.random() * 120 - 60).toFixed(0);
    petal.style.setProperty("--drift", drift + "px");

    // Random animation speeds
    petal.style.setProperty("--fall-time", 10 + Math.random() * 10 + "s");
    petal.style.setProperty("--sway-time", 4 + Math.random() * 4 + "s");
    petal.style.setProperty("--spin-time", 6 + Math.random() * 6 + "s");

    container.appendChild(petal);

    // Cleanup
    setTimeout(() => {
      petal.remove();
    }, 22000);
  }

  // Gentle continuous wind
  setInterval(createPetal, 450);
});
