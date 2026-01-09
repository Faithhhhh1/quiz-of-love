/***********************
 * QUESTIONS
 ***********************/
const questions = [
  {
    text: "What was the first thing about me that made you feel safe talking to me?",
    type: "text",
    reward: "Reading that made me smile ❤️"
  },
  {
    text: "What time of day do you feel most connected to me?",
    type: "text",
    reward: "I love knowing that 🥰"
  },
  {
    text: "What’s one habit of mine you secretly find cute?",
    type: "text",
    reward: "That’s adorable 😌"
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
  // 👉 ADD THE REST OF YOUR QUESTIONS HERE
];

/***********************
 * STATE
 ***********************/
let index = 0;

/***********************
 * VALIDATION DATA
 ***********************/
const blocked = [
  "pta nhi", "pata nahi", "idk", "i don't know",
  "yaad nahi", "mmmm", "hmm", "nothing",
  "no idea", "dont know", "don't know"
];

const hindiRegex = /[\u0900-\u097F]/;

const commonWords = [
  "i","you","me","we","us","feel","felt","safe","talk",
  "when","because","your","my","with","love","care",
  "time","first","made","thing","moment","always",
  "talking","connected","close","happy"
];

/***********************
 * HELPERS
 ***********************/
function hasMeaningfulWords(text) {
  const lower = text.toLowerCase();
  let count = 0;

  for (let word of commonWords) {
    if (
      lower.includes(` ${word} `) ||
      lower.startsWith(word + " ") ||
      lower.endsWith(" " + word)
    ) {
      count++;
    }
  }
  return count >= 2;
}

function hasSentenceFlow(text) {
  return text.trim().split(/\s+/).length >= 5;
}

function looksLikeGibberish(text) {
  const words = text.split(/\s+/);

  const shortWords = words.filter(w => w.length <= 2).length;
  if (shortWords > words.length / 2) return true;

  const upperCount = text.replace(/[^A-Z]/g, "").length;
  if (upperCount > text.length * 0.4) return true;

  return false;
}

/***********************
 * UI FUNCTIONS
 ***********************/
function showError(msg) {
  document.getElementById("error").innerText = msg;
}

function showReward(text) {
  document.getElementById("reward").innerText = text;
  document.getElementById("nextBtn").style.display = "block";
}

function loadQuestion() {
  const q = questions[index];

  document.getElementById("question").innerText = q.text;
  document.getElementById("reward").innerText = "";
  document.getElementById("error").innerText = "";
  document.getElementById("nextBtn").style.display = "none";

  document.getElementById("textBox").style.display = "none";
  document.getElementById("optionsBox").innerHTML = "";

  if (q.type === "text") {
    document.getElementById("answer").value = "";
    document.getElementById("textBox").style.display = "block";
  } else {
    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerText = opt;
      div.onclick = () => showReward(q.reward);
      document.getElementById("optionsBox").appendChild(div);
    });
  }
}

/***********************
 * SUBMIT TEXT ANSWER
 ***********************/
function submitText() {
  const answer = document.getElementById("answer").value.trim();
  const lower = answer.toLowerCase();

  if (answer.length < 20)
    return showError("Please write at least 20 characters.");

  if (hindiRegex.test(answer))
    return showError("Please write your answer in English letters only 🙂");

  for (let word of blocked) {
    if (lower.includes(word))
      return showError("Please write a proper answer from your heart ❤️");
  }

  if (!hasSentenceFlow(answer))
    return showError("Please write a meaningful sentence 😊");

  if (!hasMeaningfulWords(answer))
    return showError("Please write something meaningful ❤️");

  if (looksLikeGibberish(answer))
    return showError("That doesn’t look like a real answer. Try again 🙂");

  // ✅ VALID ANSWER
  localStorage.setItem(`answer_${index}`, answer);
  showReward(questions[index].reward);
}

/***********************
 * NEXT QUESTION
 ***********************/
function nextQuestion() {
  index++;
  if (index >= questions.length) {
    window.location.href = "proposal.html";
  } else {
    loadQuestion();
  }
}

/***********************
 * START
 ***********************/
loadQuestion();
