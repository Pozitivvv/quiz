//all answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// All options
const optionElemenets = document.querySelectorAll('.option');

const question = document.getElementById('question'); // сам вопрос
const numberOfQuestion = document.getElementById('number-of-question'), //номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); //количество всех вопросов

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страницы 

const answersTracker = document.getElementById('answers-tracker'); // Обертка для трекера
const btnNext = document.getElementById('btn-next'); //кнопка далее

let score = 0; // Итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), //Количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // количество всех вопросов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); // Кнопка "начать викторину заново"

const questions = [
    {
        question: '(CSS) Выберите свойство, позволяющее скрыть элемент:',
        options: [
            'hide',
            'display',
            'disapper',
            'margin',
        ],
        rightAnswer: 1
    },
    {
        question: '(CSS) Какое свойство не может быть анимировано про помощи animation и transition?',
        options: [
            'height',
            'display',
            'color',
            'noname',
        ],
        rightAnswer: 1
    },
    {
        question: '(JS) console.log(false || true); Что будет выведено в консоль?',
        options: [
            'true',
            'false',
            'error',
            'NaN',
        ],
        rightAnswer: 0
    }
];

numberOfAllQuestions.innerHTML = questions.length; //количество вопросов

const load = () => {
    question.innerHTML = questions[0].question; // сам вопрос

    //mapping obj 

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //Установка номера текущей страницы
    indexOfPage++;
};

let completedAnswers = []; // массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for(option of optionElemenets) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElemenets.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};

//удаление всех классов со всех ответов
const enableOptions = () => {
    optionElemenets.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if(!optionElemenets[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});


    


