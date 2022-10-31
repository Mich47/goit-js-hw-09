import * as throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const ref = {
  emailRef: formRef.elements.email,
  messageRef: formRef.elements.message,
};
const feedbackFormDataObj = {
  email: '',
  message: '',
};

ref.emailRef.setAttribute('required', true);
ref.messageRef.setAttribute('required', true);
ref.messageRef.setAttribute('minlength', 3);

setFormInputFromLocalData(ref, LOCAL_STORAGE_KEY);

formRef.addEventListener('input', throttle(saveFormDataToLocalStorage, 500));

formRef.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  feedbackFormDataObj.email = email.value;
  feedbackFormDataObj.message = message.value;

  console.log('feedbackFormDataObj ', feedbackFormDataObj);
  formRef.reset();
  clearLocalStorage(LOCAL_STORAGE_KEY);
});

function setFormInputFromLocalData({ emailRef, messageRef }, localstorageKey) {
  const localData = getFormDataFromLocalStorage(localstorageKey);

  if (!localData) {
    return;
  }
  emailRef.value = localData.email;
  messageRef.value = localData.message;
  feedbackFormDataObj.email = localData.email;
  feedbackFormDataObj.message = localData.message;
}

function saveFormDataToLocalStorage(event) {
  switch (event.target.nodeName) {
    case 'INPUT':
      feedbackFormDataObj.email = event.target.value;
      break;

    case 'TEXTAREA':
      feedbackFormDataObj.message = event.target.value;
      break;

    default:
      break;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(feedbackFormDataObj));
}

function getFormDataFromLocalStorage(localstorageKey) {
  try {
    const localData = JSON.parse(localStorage.getItem(localstorageKey));
    return localData;
  } catch (error) {
    console.log('Error ', error);
  }
}

function clearLocalStorage(localstorageKey) {
  localStorage.setItem(localstorageKey, null);
}
