const form = document.querySelector('#my-form');


form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const specialization = formData.get('specialization')
  console.log(specialization)






let category = specialization;
let quizId = 1;
let questiomMass = 0
let ansMass = 0




    let numId = await fetch(`http://localhost:4000/questionid/${category}`, {
        method: 'GET',
    })
    const resId = await numId.json()



    let allAns = resId.length

    let ansId = await fetch(`http://localhost:4000/questionid/${category}`, {
        method: 'GET',
    })
    const res = await ansId.json()

    let ansIdMassive = []


    for (i = 0; i < allAns; i++) {
        ansIdMassive.push(res[i]['id'])
    }
    console.log(`Итог ${ansIdMassive}`)



    let responce = await fetch(`http://localhost:4000/quiz/answer/${ansIdMassive[ansMass]}`, {
        method: 'GET',
    })
    const content = await responce.json()
 
    console.log(content)

  







    let responceAnswer = await fetch(`http://localhost:4000/quiz/${category}`, {
        method: 'GET',
    })
    const contentAnswer = await responceAnswer.json();
    console.log(contentAnswer)




})





async function responceEdit() {
    let responce = await fetch(`http://localhost:4000/category/quiz/name/id`, {
        method: 'GET',
    })
    const content = await responce.json()
    const list = document.querySelector('.first-select-quiz')
      
        const quizName = content.map(a => {
            return `
            <option value="${a.id}" selected>
            ${a.name}
        </option>
        `
        })

    
    list.innerHTML = quizName
    
  }
  responceEdit()
  