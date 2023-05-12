let quizId = 1;
const sumbit = document.getElementById('sumbit')
const timer = document.getElementById('timer')
let score = 0




async function getResponce() {

    let responce = await fetch(`http://localhost:4000/quiz/answer/${quizId}`, {
        method: 'GET',
    })
    const content = await responce.json()
    let key;

    const list = document.querySelector('.text')
    console.log(content)
    for (key in content)
        list.innerHTML = `
        <li class="answers">
        <input name="answer" type="radio" id="b" class="answer" onclick="setCurrAnswer(${content[0]['is_correct']})"
        >
        <label for="b" id="answer_b">${content[0]['answer']}</label>
    </li>
    <li class="answers">
        <input name="answer" type="radio" id="b" class="answer" onclick="setCurrAnswer(${content[1]['is_correct']})"
        >
        <label for="b" id="answer_b">${content[1]['answer']}</label>
    </li>
    <li class="answers">
        <input name="answer" type="radio" id="b" class="answer" onclick="setCurrAnswer(${content[2]['is_correct']})"
        >
        <label for="b" id="answer_b">${content[2]['answer']}</label>
    </li>
    <li class="answers">
        <input name="answer" type="radio" id="b" class="answer" onclick="setCurrAnswer(${content[3]['is_correct']})"
        >
        <label for="b" id="answer_b">${content[3]['answer']}</label>
    </li>
  `
    console.log(content[key]);


}


getResponce();




async function getResponceAns() {
    let responceAnswer = await fetch(`http://localhost:4000/quiz/${quizId}`, {
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

async function nextQuestions() {
    sumbit.addEventListener('click', function () {
        quizId++

        setCurrAnswer()
        return getResponce(), getResponceAns()

    })
    getTime()

}


const setCurrAnswer = (isTrue) => {
    if (isTrue) {
        score++
        console.log("Правильно")
    } else {
        console.log("Неа")
    }
}


nextQuestions()


// async function getTime() {
//     let count = 15

//     countdown = setInterval(() => {
//         count--
//         timer.innerHTML = `${count}s`
//         if (count == 0) {
//             quizId++

//             nextQuestions()
//             clearInterval(countdown)
//             return nextQuestions(), getResponce(), getResponceAns()
//         }
//     }, 1000)
// }


// getTime();














    



