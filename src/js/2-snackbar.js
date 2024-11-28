import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const promiseState = event.target.elements.state.value;
  const promiseDelay = parseInt(event.target.elements.delay.value, 10);

  if (isNaN(promiseDelay) || promiseDelay < 0) {
    iziToast.error({
      message: 'Please enter a valid positive number for delay.',
      position: 'topRight',
      theme: 'dark',
    });
    return;
  }

  promiseSubmit(promiseState, promiseDelay)
    .then(result => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
        theme: 'dark',
        backgroundColor: '#28a745',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
        theme: 'dark',
        backgroundColor: '#FF0000',
      });
    });
}

function promiseSubmit(promiseState, promiseDelay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(promiseDelay);
      } else {
        reject(promiseDelay);
      }
    }, promiseDelay);
  });
}
