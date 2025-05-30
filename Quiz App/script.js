// DOM Elements
const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.time-left');
const progressBar = document.querySelector('.progress-bar');
const categoryDisplay = document.querySelector('.category-display');
const welcomeScreen = document.querySelector('.welcome-screen');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const categoryButtons = document.querySelectorAll('.category-btn');
const scoresList = document.querySelector('.scores-list');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 60;
let timerID = null;
let selectedDifficulty = 'medium';
let selectedCategory = 'all';
let currentQuestions = [];

// High Scores
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Questions Database
const questions = {
    logical: [
        {
            question: "If all roses are flowers and some flowers fade quickly, which statement must be true?",
            choices: [
                "All roses fade quickly",
                "Some roses may fade quickly",
                "No roses fade quickly",
                "All flowers are roses"
            ],
            answer: "Some roses may fade quickly",
            difficulty: "easy"
        },
        {
            question: "If no birds are mammals and all sparrows are birds, which statement must be true?",
            choices: [
                "All sparrows are mammals",
                "No sparrows are mammals",
                "Some sparrows are mammals",
                "All mammals are sparrows"
            ],
            answer: "No sparrows are mammals",
            difficulty: "easy"
        },
        {
            question: "If all A are B, and all B are C, which statement must be true?",
            choices: [
                "All C are A",
                "All A are C",
                "Some C are not A",
                "No A are C"
            ],
            answer: "All A are C",
            difficulty: "easy"
        }
    ],
    analytical: [
        {
            question: "In a sequence of numbers: 2, 4, 8, 16, 32, what comes next?",
            choices: [
                "48",
                "64",
                "56",
                "72"
            ],
            answer: "64",
            difficulty: "medium"
        },
        {
            question: "If a clock shows 3:45, what is the angle between the hour and minute hands?",
            choices: [
                "157.5 degrees",
                "162.5 degrees",
                "167.5 degrees",
                "172.5 degrees"
            ],
            answer: "157.5 degrees",
            difficulty: "medium"
        }
    ],
    critical: [
        {
            question: "A company's profits have decreased for three consecutive quarters. What is the most logical next step?",
            choices: [
                "Immediately lay off employees",
                "Analyze the causes of the decrease",
                "Increase product prices",
                "Close the business"
            ],
            answer: "Analyze the causes of the decrease",
            difficulty: "hard"
        },
        {
            question: "A new study shows that people who exercise regularly live longer. What is the most accurate conclusion?",
            choices: [
                "Exercise directly causes longer life",
                "There is a correlation between exercise and longer life",
                "All people who exercise will live longer",
                "Exercise is the only factor affecting lifespan"
            ],
            answer: "There is a correlation between exercise and longer life",
            difficulty: "medium"
        }
    ]
};

// Function to get questions based on category and difficulty
const getQuestions = () => {
    let filteredQuestions = [];
    
    if (selectedCategory === 'all') {
        Object.values(questions).forEach(category => {
            filteredQuestions = filteredQuestions.concat(
                category.filter(q => q.difficulty === selectedDifficulty)
            );
        });
    } else {
        filteredQuestions = questions[selectedCategory].filter(
            q => q.difficulty === selectedDifficulty
        );
    }
    
    return filteredQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
};

// Function to start quiz
const startQuiz = () => {
    timeLeft = 60;
    currentQuestions = getQuestions();
    if (currentQuestions.length === 0) {
        displayAlert("No questions available for selected category and difficulty!");
        welcomeScreen.style.display = "block";
        container.style.display = "none";
        return;
    }
    currentQuestionIndex = 0;
    score = 0;
    quizOver = false;
    showQuestions();
};

// Function to update progress bar
const updateProgress = () => {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
};

// Function to show questions
const showQuestions = () => {
    const questionDetails = currentQuestions[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    categoryDisplay.textContent = `Category: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;

    choicesBox.textContent = "";
    questionDetails.choices.forEach(choice => {
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = choice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            const selectedChoice = document.querySelector('.choice.selected');
            if (selectedChoice) {
                selectedChoice.classList.remove('selected');
            }
            choiceDiv.classList.add('selected');
        });
    });

    updateProgress();
    startTimer();
};

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice) {
        displayAlert("Please select an answer!");
        return false;
    }

    const isCorrect = selectedChoice.textContent === currentQuestions[currentQuestionIndex].answer;
    if (isCorrect) {
        score++;
        displayAlert("Correct Answer!");
    } else {
        displayAlert(`Wrong Answer! ${currentQuestions[currentQuestionIndex].answer} is the correct answer.`);
    }

    timeLeft = 60;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
    return true;
};

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    const percentage = (score / currentQuestions.length) * 100;
    scoreCard.textContent = `You scored ${score} out of ${currentQuestions.length} (${percentage.toFixed(1)}%)`;
    
    // Update high scores
    updateHighScores(score, percentage);
    displayHighScores();
    
    nextBtn.textContent = "Play Again";
    quizOver = true;
};

// Function to update high scores
const updateHighScores = (score, percentage) => {
    const newScore = {
        score,
        percentage,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        date: new Date().toLocaleDateString()
    };
    
    highScores.push(newScore);
    highScores.sort((a, b) => b.percentage - a.percentage);
    highScores = highScores.slice(0, 5); // Keep only top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores));
};

// Function to display high scores
const displayHighScores = () => {
    scoresList.innerHTML = highScores.map((score, index) => `
        <div class="score-item">
            ${index + 1}. ${score.percentage.toFixed(1)}% (${score.score}/${currentQuestions.length})
            - ${score.category} - ${score.difficulty}
            <small>${score.date}</small>
        </div>
    `).join('');
};

// Function to display alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
};

// Function to start timer
const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm("Time's up! Do you want to continue to the next question?");
            if (confirmUser) {
                timeLeft = 60;
                currentQuestionIndex++;
                if (currentQuestionIndex < currentQuestions.length) {
                    showQuestions();
                } else {
                    stopTimer();
                    showScore();
                }
            } else {
                stopTimer();
                showScore();
            }
        }
    };
    timerID = setInterval(countDown, 1000);
};

// Function to stop timer
const stopTimer = () => {
    clearInterval(timerID);
};

// Event Listeners
startBtn.addEventListener('click', () => {
    welcomeScreen.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        welcomeScreen.style.display = "block";
        container.style.display = "none";
    } else {
        checkAnswer();
    }
});

// Difficulty selection
difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        difficultyButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedDifficulty = btn.dataset.difficulty;
    });
});

// Category selection
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedCategory = btn.dataset.category;
    });
});

// Initialize
difficultyButtons[1].classList.add('selected'); // Default to medium
categoryButtons[0].classList.add('selected'); // Default to all categories