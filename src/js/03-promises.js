import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formInput = document.querySelector('.form');


formInput.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const formData = {};
  new FormData(event.currentTarget).forEach((val, name) => {
    formData[name] = val;
  })
  console.log(formData);
  let delay = Number(formData.delay) - Number(formData.step);
  for (let i = 1; i <= formData.amount; i += 1){
    delay += Number(formData.step);
    console.log(`i= ${i}, delay= ${delay}`)

    createPromise(i, delay)
      .then((message) => {
       Notify.success(message);
      })
      .catch((message) => {
        Notify.failure(message);
      })
  }

}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
