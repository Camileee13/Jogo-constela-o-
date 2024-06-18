
const questions = [
    {
        question: "Qual constelação é conhecida como o 'Grande Urso'?",
        answers: [
            { text: "Orion", correct: false },
            { text: "Ursa Menor", correct: false },
            { text: "Ursa Maior", correct: true },
            { text: "Cassiopeia", correct: false }
        ]
    },
    {
        question: "Qual estrela é a mais brilhante na constelação de Orion?",
        answers: [
            { text: "Betelgeuse", correct: false },
            { text: "Sirius", correct: false },
            { text: "Rigel", correct: true },
            { text: "Aldebaran", correct: false }
        ]
    },
    // Adicione mais perguntas conforme necessário
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const scoreValue = document.getElementById('score-value');

let shuffledQuestions, currentQuestionIndex, score;

startGame();

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.classList.remove('hide');
    nextButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    scoreValue.innerText = score;
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Reiniciar';
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
