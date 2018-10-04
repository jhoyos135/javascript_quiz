class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0; 
    }

    getQuestionIndex() {

        return this.questions[this.questionIndex];
    }

    guess(answer) {

        if(this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
    
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }

}

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer; 
    }
        isCorrectAnswer(choice){
                return this.answer === choice;
        }
}

function populate() {
    if(quiz.isEnded()) {

        showScores();

    } else {
        // show question
        let element = document.querySelector("#question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;

        for(let i = 0; i < choices.length; i++) {
            let element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    let button = document.getElementById(id);

    button.onclick = () => {
        quiz.guess(guess);
        populate();
    };
}


function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let element = document.querySelector("#progress");
    element.innerHTML = `

    Question ${currentQuestionNumber} of ${quiz.questions.length}

    `;
}

function showScores() {

    let gameOverHTML = "<h1>Result</h1>";

    if (quiz.score < quiz.questions.length ) {
        gameOverHTML += `
        <h4 class="center-align">almost there<h4>
        <h2 id='score'>Your score is:  ${quiz.score} </h2>
        <button class="waves-effect waves-light btn-large" onClick="window.location.reload()"><span>Try Again</span></button>
        
        `;
    } else {
        gameOverHTML += `
        <h4 class="center-align">Great Job!<h4>
        <h2 id='score'>Your score is:  ${quiz.score} </h2>
        <button class="waves-effect waves-light btn-large" onClick="window.location.reload()"><span>Try Again</span></button>
        
        `;
    }

    let element = document.querySelector("#quiz");

    element.innerHTML = gameOverHTML;
}

// create questions
let questions = [
    new Question("Which one is not programming language?",
    ["Java", "C#","Css", "Javascript"], "Css"),
    new Question("Which language is used for the mark up in web pages?", 
    ["HTML", "JQuery", "CSS", "XML"], "HTML"),
    new Question("There are ____ types of operators in JavaScript.", 
    ["1", "8","2", "4"], "8"),
    new Question("Which language is used for the web?", 
    ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("jQuery is a ____.", 
    ["Language", "Library", "Framework", "All"], "Library")
];

// create quiz
const quiz = new Quiz(questions);

// display quiz
populate();




