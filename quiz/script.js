const questions = [
  // Assessing the Situation
  {
    question:
      "What specific situations or events are causing you stress right now?",
    answers: [
      { text: "Personal relationships", stressLevel: 1 },
      { text: "Work-related issues", stressLevel: 2 },
      { text: "Financial concerns", stressLevel: 2 },
      { text: "Health-related problems", stressLevel: 3 },
    ],
  },
  {
    question: "How long have you been feeling stressed about these issues?",
    answers: [
      { text: "A few days", stressLevel: 1 },
      { text: "A few weeks", stressLevel: 2 },
      { text: "A few months", stressLevel: 3 },
      { text: "More than six months", stressLevel: 3 },
    ],
  },
  {
    question:
      "On a scale of 1-10, how would you rate your current stress level?",
    answers: [
      { text: "1-3 (Low)", stressLevel: 1 },
      { text: "4-6 (Moderate)", stressLevel: 2 },
      { text: "7-8 (High)", stressLevel: 3 },
      { text: "9-10 (Very High)", stressLevel: 3 },
    ],
  },
  // Identifying Symptoms
  {
    question: "Have you noticed any changes in your sleep patterns recently?",
    answers: [
      { text: "No changes", stressLevel: 0 },
      { text: "Slight changes", stressLevel: 1 },
      { text: "Moderate changes", stressLevel: 2 },
      { text: "Significant changes", stressLevel: 3 },
    ],
  },
  {
    question: "How has your appetite been lately?",
    answers: [
      { text: "Normal", stressLevel: 0 },
      { text: "Slightly decreased", stressLevel: 1 },
      { text: "Moderately decreased", stressLevel: 2 },
      { text: "Significantly decreased", stressLevel: 3 },
    ],
  },
  {
    question:
      "Are you experiencing any physical symptoms like headaches, muscle tension, or fatigue?",
    answers: [
      { text: "Not at all", stressLevel: 0 },
      { text: "A little", stressLevel: 1 },
      { text: "Somewhat", stressLevel: 2 },
      { text: "Very much", stressLevel: 3 },
    ],
  },
  {
    question: "Have you been having trouble concentrating or making decisions?",
    answers: [
      { text: "Never", stressLevel: 0 },
      { text: "Rarely", stressLevel: 1 },
      { text: "Sometimes", stressLevel: 2 },
      { text: "Often", stressLevel: 3 },
    ],
  },
  // Coping Strategies
  {
    question: "What methods have you tried to manage your stress so far?",
    answers: [
      { text: "Exercise", stressLevel: 1 },
      { text: "Meditation", stressLevel: 1 },
      { text: "Talking to friends", stressLevel: 1 },
      { text: "Nothing at all", stressLevel: 3 },
    ],
  },
  {
    question:
      "Which stress management techniques have worked well for you in the past?",
    answers: [
      { text: "None", stressLevel: 3 },
      { text: "Exercise", stressLevel: 1 },
      { text: "Mindfulness", stressLevel: 1 },
      { text: "Spending time with loved ones", stressLevel: 1 },
    ],
  },
  {
    question:
      "Are there any healthy activities or hobbies you enjoy that help you relax?",
    answers: [
      { text: "Yes, several", stressLevel: 0 },
      { text: "A couple", stressLevel: 1 },
      { text: "Not many", stressLevel: 2 },
      { text: "None", stressLevel: 3 },
    ],
  },
  {
    question:
      "Who are the supportive people in your life that you can talk to about what you're going through?",
    answers: [
      { text: "Family", stressLevel: 0 },
      { text: "Friends", stressLevel: 1 },
      { text: "Co-workers", stressLevel: 1 },
      { text: "No one", stressLevel: 3 },
    ],
  },
  // Seeking Help
  {
    question:
      "Have you considered reaching out to a mental health professional for support?",
    answers: [
      { text: "Yes, definitely", stressLevel: 0 },
      { text: "Maybe", stressLevel: 1 },
      { text: "Not really", stressLevel: 2 },
      { text: "No, not at all", stressLevel: 3 },
    ],
  },
  {
    question:
      "Would you be open to trying relaxation techniques like deep breathing, meditation, or yoga?",
    answers: [
      { text: "Absolutely", stressLevel: 0 },
      { text: "Perhaps", stressLevel: 1 },
      { text: "Not sure", stressLevel: 2 },
      { text: "Not interested", stressLevel: 3 },
    ],
  },
  {
    question:
      "What specific changes could you make in your daily routine to reduce stress and promote self-care?",
    answers: [
      { text: "None needed", stressLevel: 0 },
      { text: "A few minor changes", stressLevel: 1 },
      { text: "Some significant changes", stressLevel: 2 },
      { text: "Major overhaul needed", stressLevel: 3 },
    ],
  },
];

let currentQuestionIndex = 0;
let totalStressLevel = 0;

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const solutionText = document.getElementById("solution-text");
const restartButton = document.getElementById("restart-button");

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  totalStressLevel = 0;
  resultContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  setNextQuestion();
});

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => {
      totalStressLevel += answer.stressLevel;
      nextButton.classList.remove("hidden");
      disableButtons();
    });
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function disableButtons() {
  const buttons = answerButtons.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function showResults() {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  let problem, solutions;

  if (totalStressLevel <= 3) {
    problem = "You're generally handling stress well!";
    solutions = "Continue practicing healthy habits and self-care.";
  } else if (totalStressLevel <= 6) {
    problem = "You might be experiencing moderate stress.";
    solutions =
      "Consider incorporating relaxation techniques such as meditation or yoga.";
  } else {
    problem = "You may be experiencing high levels of stress.";
    solutions =
      "It's important to reach out for support. Consider talking to a mental health professional.";
  }

  resultText.innerText = problem;
  solutionText.innerText = solutions;
}

// Start the quiz
setNextQuestion();
