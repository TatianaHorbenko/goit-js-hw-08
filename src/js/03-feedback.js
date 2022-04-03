import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

const storageKey = 'feedback-form-state';

const formData = {};

function onFormInput(event) {
  formData.message = form.elements.message.value;
  formData.email = form.elements.email.value;
  localStorage.setItem(storageKey, JSON.stringify(formData));
}

formRefresh();

function formRefresh() {
  const savedData = localStorage.getItem(storageKey);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.email.value = email;
    form.message.value = message;
    formData.email = email;
    formData.message = message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const formDataToSend = new FormData(event.currentTarget);
  formDataToSend.forEach((value, name) => {
    formData[name] = value;
  });

  event.currentTarget.reset();
  localStorage.removeItem(storageKey);

  
}