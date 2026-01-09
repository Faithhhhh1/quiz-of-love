/******** QUESTIONS ********/
const questions = [
  {
    text: "What was the first thing about me that made you feel safe talking to me?",
    type: "text",
    reward: "Reading that made me smile ❤️",
    keywords: ["safe", "trust", "listen"]
  },
  {
    text: "What’s your favorite version of me?",
    type: "options",
    options: [
      "Sleepy me",
      "Serious me",
      "Loving but naughty me",
      "Normal me"
    ],
    reward: "I love that version too 💖"
  }
];

/******** GIFS ********/
const gifs = [
  "assets/10344274144504984.gif",
  "assets/143552925555589073.gif",
  "assets/27021666509846925.gif",
  "assets/35395547060768152.gif",
  "assets/3588874692373379.gif",
  "assets/461619030576156033.gif",
  "assets/58406126413699972.gif",
  "assets/66217057016734145.gif",
  "assets/7107311904187212.gif",
  "assets/83738874316669407.gif"
];

let index = 0;

/******** MUSIC ********/
function playYouTubeMusic() {
  const iframe = document.getElementById("ytPlayer");
  if (!iframe) return;

  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func: "playVideo", args: [] }),
    "*"
  );
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func: "unMute", args: [] }),
    "*"
  );
}

/******** GIF ********/
function setRandomGif() {
  const img = document.getElementById("questionGif");
  if (!img) return;

  img.style.opacity = 0;
  setTimeout(() => {
    img.src = gifs[Math.floor(Math.random() * gifs.length)];
    img.style.opacity = 1;
  }, 200);
}

/******** SAKURA ********/
function createSakura() {
  const container = document.getElementById("sakura-container");
  if (!container) return;

  const petal = document.createElement("div");
  petal.className = "sakura";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 8 + Math.random() * 6 + "s";
  container.appendChild(petal);

  setTimeout(() => petal.remove(), 15000);
}
setInterval(createSakura, 700);

/******** LOAD ********/
function loadQuestion() {
  const q = questions[index];
  document.getElementById("question").innerText = q.text;
  document.getElementById("reward").innerText = "";
  document.getElementById("error").innerText = "";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("optionsBox").innerHTML = "";
  document.getElementById("textBox").style.display = "none";

  setRandomGif();

  if (q.type === "text") {
    document.getElementById("answer").value = "";
    document.getElementById("charCount").innerText = "0";
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("textBox").style.display = "block";
  } else {
    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerText = opt;
      div.onclick = () => {
        playYouTubeMusic();
        document.getElementById("reward").innerText = q.reward;
        document.getElementById("nextBtn").style.display = "block";
      };
      document.getElementById("optionsBox").appendChild(div);
    });
  }
}

function updateCounter() {
  const count = document.getElementById("answer").value.length;
  document.getElementById("charCount").innerText = count;
  document.getElementById("submitBtn").disabled = count < 15;
}

function submitText() {
  playYouTubeMusic();
  document.getElementById("reward").innerText =
    questions[index].reward;
  document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
  index++;
  if (index >= questions.length) {
    window.location.href = "proposal.html";
  } else {
    loadQuestion();
  }
}

document.addEventListener("DOMContentLoaded", loadQuestion);
