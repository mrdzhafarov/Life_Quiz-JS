const questions = [

    {
        question: "В каком году был создан JavaScript?",
        answers: ["1996", "1994", "1995", "все ответы неверные"],
        correct: 3,
    },

    {
        question: "Что означает HTML?",
        answers: [
        "Hypertext Markup Language",
        "Hypertext Markdown Language",
        "Hyperloop Machine Language",
        "Helicopters Terminals Motorboats Lamborginis",
        ],
        correct: 1,
    },

    {
        question: "Какой язык работает в браузере?",
        answers: ["Java", "C", "Python", "JavaScript"],
        correct: 4,
    },

    {
        question: "Что означает CSS?",
        answers: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Cascading Simple Sheets",
        "Cars SUVs Sailboats",
        ],  
        correct: 2,

    },
];




// Нахожу элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit')




// Переменные для квиза
let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос;




// Очищаю на старте
clearPage()
showQuestion()
submitBtn.onclick = checkAnswer;




function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}




function showQuestion() {

// Вопрос
const headerTemlate = `<h2 class="title">%title%</h2>`
const title = headerTemlate.replace('%title%', questions[questionIndex]['question'])
headerContainer.innerHTML = title



// Варианты ответов
let answerNumber = 1;
for (answerText of questions[questionIndex]['answers']) {
const questionTemplate =
                `<li>
                     <label>
                           <input value="%number%" type="radio" class="answer" name="answer" />
                           <span>%answer%</span>
                    </label>
                </li>`;

const answerHTML = questionTemplate
                        .replace('%answer%', answerText)
                        .replace('%number%', answerNumber);

    listContainer.innerHTML += answerHTML
    answerNumber++;
    }
}



function checkAnswer() {

// Нахожу выбранную радио кнопку
const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

// Если ответ не выбран - ничего не делаем, выходим из функций
if(!checkedRadio){
    submitBtn.blur()
    return
}



// Узнаем номер ответа пользователя
const userAnswer = parseInt(checkedRadio.value)


//Если ответил верно - увеличиваем счет
if(userAnswer === questions[questionIndex]['correct']){
    score++;
}   

if(questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage()
    showQuestion()
    return;
} else {
    clearPage()
    showResults()
}
}




function showResults() {

const resultsTemple =`
<h2 class="title">%title%</h2>
<h3 class="summary">%message%</h3>
<p class="result">%result%</p>
`;

let title, message;

// Варианты заголовков и текста
if(score === questions.length) {
    title = 'Поздравляем! 🎉';
    message = 'Вы ответили на все вопросы! 😎👍';
} else if ((score * 100) / questions.length >= 50) {
    title = 'Неплохой результат! 😉';
    message = 'Вы дали более половины правильных ответов! 👍';
} else {
    title = 'Стоит постараться! 😐';
    message = 'Пока у вас меньше половины правильных ответов!';

}

// Результаты
let result = `${score} из ${questions.length}`
const finalMessage = resultsTemple
                            .replace('%title%', title)
                            .replace('%message%', message)
                            .replace('%result%', result)

headerContainer.innerHTML = finalMessage



//Меняю кнопку на играть снова
submit.blur();
submitBtn.innerHTML = 'Начать заново';
submitBtn.onclick = () => history.go()

}