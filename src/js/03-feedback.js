import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const FEEDBACK_FORM_STATE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(saveFormState, 500));
form.addEventListener('submit', handleSubmit);

loadFormState();

function saveFormState() {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(FEEDBACK_FORM_STATE_KEY, JSON.stringify(formState));
}

function loadFormState() {
  const savedFormState = localStorage.getItem(FEEDBACK_FORM_STATE_KEY);
  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formState);
  localStorage.removeItem(FEEDBACK_FORM_STATE_KEY);
  form.reset();
}
