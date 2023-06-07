const form = document.querySelector('#my-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // получаем данные из формы
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // отправляем POST запрос на backend
    const response = await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    // обрабатываем ответ от backend
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});