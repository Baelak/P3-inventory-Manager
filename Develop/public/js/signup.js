document.addEventListener('DOMContentLoaded', () => {
  const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the signup form
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
      // Send a POST request to the signup route
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Redirect to the homepage after a successful signup
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  const signupForm = document.querySelector('.signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
  }
});
