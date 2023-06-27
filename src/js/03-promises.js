// 03-promises.js
const promiseForm = document.querySelector('#promise-form');

promiseForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  
  const delayInput = document.querySelector('#delay');
  const stepInput = document.querySelector('#step');
  const amountInput = document.querySelector('#amount');
  
  const initialDelay = Number(delayInput.value);
  const delayStep = Number(stepInput.value);
  const amount = Number(amountInput.value);
  
  createPromises(initialDelay, delayStep, amount)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
}

function createPromises(initialDelay, delayStep, amount) {
  return new Promise((resolve, reject) => {
    const promises = [];
    let currentDelay = initialDelay;
    
    if (amount < 1) {
      reject(new Error("Amount should be greater than 0."));
    }
    
    for (let i = 0; i < amount; i++) {
      const promise = new Promise((innerResolve) => {
        setTimeout(() => {
          innerResolve(`Promise ${i + 1} resolved after ${currentDelay}ms`);
        }, currentDelay);
      });
      
      promises.push(promise);
      currentDelay += delayStep;
    }
    
    Promise.all(promises)
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
}