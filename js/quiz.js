const questions = [
  {
    text: "What was the first thing about me that made you feel safe talking to me?",
    type: "text",
    reward: "Reading that made me smile ❤️"
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

const gifs = [
  "assets/assets1.gif",
  "assets/assets2.gif",
  "assets/assets3.gif"
];

let index = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const rewardEl = document.getElementById("reward");
const charCount = document.getElementById("charCount");
const gifEl = document.getElementById("questionGif");

function loadQuestion() {
  const q = questions[index];

  questionEl.textContent = q.text;
  rewardEl.textContent = "";
  nextBtn.classList.add("hidden");

  gifEl.src = gifs[Math.floor(Math.random() * gifs.length)];

  answerEl.value = "";
  charCount.textContent = "0";
  submitBtn.disabled = true;
  answerEl.style.display = "block";
  submitBtn.style.display = "block";

  document.querySelectorAll(".option").forEach(o => o.remove());

  if (q.type === "options") {
    answerEl.style.display = "none";
    submitBtn.style.display = "none";

    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = opt;
      btn.onclick = () => {
        rewardEl.textContent = q.reward;
        nextBtn.classList.remove("hidden");
      };
      document.querySelector(".quiz-card").appendChild(btn);
    });
  }
}

answerEl.addEventListener("input", () => {
  const len = answerEl.value.trim().length;
  charCount.textContent = len;
  submitBtn.disabled = len < 15;
});

submitBtn.addEventListener("click", () => {
  rewardEl.textContent = questions[index].reward;
  nextBtn.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
  index++;
  if (index >= questions.length) {
    window.location.href = "proposal.html";
  } else {
    loadQuestion();
  }
});

loadQuestion();
