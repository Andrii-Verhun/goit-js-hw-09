import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const formGenPromise = document.querySelector('.form');


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });

  promise.then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
      useIcon: false,
    });
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
      useIcon: false,
    });
  });
  return promise;
};

formGenPromise.addEventListener('submit', (e) => {
  e.preventDefault();
  const {
    elements: {delay, step, amount} 
  } = e.currentTarget;
  let delayValue = parseInt(delay.value, 10);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delayValue);
    delayValue += parseInt(step.value, 10);
  };
});
