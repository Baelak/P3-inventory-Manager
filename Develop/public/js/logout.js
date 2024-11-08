// public/js/logout.js
document.addEventListener('DOMContentLoaded', () => {
  // Function to handle logout
  const logout = async (event) => {
    event.preventDefault(); // Prevent default anchor link behavior

    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const logoutButton = document.querySelector('#logout');
  
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }
});
