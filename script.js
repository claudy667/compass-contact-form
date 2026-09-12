const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

const fields = {
  fullName: {
    input: document.getElementById('fullName'),
    error: document.getElementById('fullNameError'),
    validate: (value) => value.trim().length > 0,
    message: 'Enter your full name.',
  },
  email: {
    input: document.getElementById('email'),
    error: document.getElementById('emailError'),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: 'Enter a valid email address.',
  },
  subject: {
    input: document.getElementById('subject'),
    error: document.getElementById('subjectError'),
    validate: (value) => value.trim().length > 0,
    message: 'Let a tutor know which course this is for.',
  },
  message: {
    input: document.getElementById('message'),
    error: document.getElementById('messageError'),
    validate: (value) => value.trim().length >= 10,
    message: 'Add a bit more detail (at least 10 characters).',
  },
};

function validateField(field) {
  const value = field.input.value;
  const isValid = field.validate(value);
  field.input.closest('.field').classList.toggle('invalid', !isValid);
  field.error.textContent = isValid ? '' : field.message;
  return isValid;
}

// Validate on blur so people get feedback as they go, not just on submit
Object.values(fields).forEach((field) => {
  field.input.addEventListener('blur', () => validateField(field));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const results = Object.values(fields).map(validateField);
  const allValid = results.every(Boolean);

  if (!allValid) {
    successMsg.classList.remove('show');
    // Move focus to the first invalid field
    const firstInvalid = Object.values(fields).find((f) => !f.validate(f.input.value));
    firstInvalid.input.focus();
    return;
  }

  // In a real build this is where you'd send the data to a server.
  successMsg.classList.add('show');
  form.reset();
  Object.values(fields).forEach((f) => f.input.closest('.field').classList.remove('invalid'));
});