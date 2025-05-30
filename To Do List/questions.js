// Logical Reasoning Questions
const logicalQuestions = [
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
    },
    // Add more logical questions...
];

// Analytical Reasoning Questions
const analyticalQuestions = [
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
    },
    {
        question: "In a row of children, Rahul is 7th from the left and Sonia is 12th from the right. If they exchange positions, Rahul becomes 22nd from the left. How many children are there in the row?",
        choices: [
            "33",
            "34",
            "35",
            "36"
        ],
        answer: "33",
        difficulty: "hard"
    },
    // Add more analytical questions...
];

// Critical Thinking Questions
const criticalQuestions = [
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
    },
    {
        question: "A city is experiencing increased traffic congestion. Which solution would be most effective in the long term?",
        choices: [
            "Build more roads",
            "Implement a comprehensive public transportation system",
            "Increase parking fees",
            "Ban cars from the city center"
        ],
        answer: "Implement a comprehensive public transportation system",
        difficulty: "hard"
    },
    // Add more critical thinking questions...
];

// Export the questions
export const questions = {
    logical: logicalQuestions,
    analytical: analyticalQuestions,
    critical: criticalQuestions
}; 