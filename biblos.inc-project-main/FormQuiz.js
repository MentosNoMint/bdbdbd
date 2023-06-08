const form = document.querySelector('#my-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    let questions_id = 1
    // получаем данные из формы
    const formData = new FormData(form);
    const name = formData.get('nameQuiz');
    const questions = formData.get('questions');
    const answer = formData.get('answer')
   
    console.log(answer)
    await fetch('http://localhost:4000/answer/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({answer , questions_id}),
    });
    // отправляем POST запрос на backend
    const nameId = await fetch('http://localhost:4000/name/id', {
      method: 'GET',
    });
    const resId = await nameId.json()

    let resultNameId = resId.map(a => a.id)
    let category_id = resultNameId[resultNameId.length - 1]

    const response = await fetch('http://localhost:4000/name/quiz/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name}),
    });

    await fetch('http://localhost:4000/question/quiz/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({questions, category_id}),
    });


    // обрабатываем ответ от backend
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});