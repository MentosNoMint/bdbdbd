let quizId = 1;
const sumbit = document.getElementById('sumbit')

sumbit.addEventListener('click', function() {
    quizId++ 
    console.log(quizId)
});

async function getResponce() {
    let responce = await fetch(`http://localhost:3000/quiz/answer/${quizId}`, {
        method: 'GET',
    })
    const content = await responce.json()

    let key;

    const list = document.querySelector('.text')
    console.log(content)
    for (key in content)
        list.innerHTML = `
        <li class="answers">
        <input name="answer" type="radio" id="a" class="answer">
        <label for="a" id="answer_a">${content[0]['answer']}</label>
    </li>
    <li class="answers">
        <input name="answer" type="radio" id="b" class="answer">
        <label for="b" id="answer_b">${content[1]['answer']}</label>
    </li>
    <li class="answers">
        <input name="answer" type="radio" id="c" class="answer">
        <label for="c" id="answer_c">${content[2]['answer']}</label>
    </li>
    <li class="answers">
        <input name="answer" type="radio" id="d" class="answer">
        <label for="d" id="answer_d">${content[3]['answer']}</label>
    </
  `
  console.log(content[key]);
}


getResponce();


async function getResponceAns() {
    let responceAnswer = await fetch(`http://localhost:3000/quiz/${quizId}`, {
        method: 'GET',
    })
    const contentAnswer = await responceAnswer.json();

    const listAns = document.querySelector('.quizAns')
    let key
    for (key in contentAnswer)
        listAns.innerHTML = `
<h2> ${contentAnswer[key].questions} </h2>
`
}

getResponceAns()





   


    
// function nextQuestion() {
//     currentQuestion++; // увеличиваем номер текущего вопроса
//     if(currentQuestion < questions.length) { // если есть еще вопросы
//       document.getElementById("answer").value = ""; // очищаем поле ввода ответа
//       document.getElementById("result").style.display = "none"; // скрываем блок с результатом
//       document.querySelector(".question p").innerHTML = questions[currentQuestion].question; // меняем текст вопроса
//     } else { // если вопросы закончились
//       document.querySelector(".question").style.display = "none"; // скрываем блок с вопросами
//       document.querySelector(".result").innerHTML = "Вы ответили на все вопросы"; // выводим сообщение о завершении теста
//     }
//   }

