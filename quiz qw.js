let quizId = 1;
const sumbit = document.getElementById('sumbit')
const timer = document.getElementById('timer')


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

async function nextQuestions() {
    sumbit.addEventListener('click', function () {
        quizId++

        return getResponce(), getResponceAns()
    })
    getTime()
    console.log()
}

nextQuestions()


async function getTime() {
    let count = 15

    countdown = setInterval(() => {
        count--
        timer.innerHTML = `${count}s`
        if (count == 0) {
            quizId++
            
            nextQuestions()
            clearInterval(countdown)
            return nextQuestions(), getResponce(), getResponceAns()
        }
    }, 1000)
}

getTime()











