var form = document.getElementById('email-form');
const modal = document.querySelector('.modal');
const innerModal = document.querySelector('.inner-modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const imgModal = document.querySelector('#modal-form-img');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById('my-form-status');
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        imgModal.src = 'images/checked.png';
        status.textContent = 'Thanks for your submission!';
        form.reset();
        openModal();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            imgModal.src = 'images/warning.png';
            status.textContent = data['errors']
              .map(error => error['message'])
              .join(', ');
            openModal();
          } else {
            imgModal.src = 'images/warning.png';
            status.textContent =
              'Oops! There was a problem submitting your form';
            openModal();
          }
        });
      }
    })
    .catch(error => {
      imgModal.src = 'images/warning.png';
      status.textContent = 'Oops! There was a problem submitting your form';
      openModal();
    });
}
form.addEventListener('submit', handleSubmit);
