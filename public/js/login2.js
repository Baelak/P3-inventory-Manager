// app.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página
  
    // Obtén el nombre del usuario
    const username = document.getElementById('username-login').value;
  
    // Guarda el nombre en localStorage (opcional)
    localStorage.setItem('username-login', username);
  
    // Muestra el mensaje de bienvenida
    document.getElementById('user').textContent = username;
    document.getElementById('welcomeMessage').style.display = 'block';
  
    // Oculta el formulario de login
    document.getElementById('loginForm').style.display = 'none';
  });
  
  // Mostrar el nombre del usuario si ya ha hecho login antes
  window.onload = function() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      document.getElementById('user').textContent = storedUsername;
      document.getElementById('welcomeMessage').style.display = 'block';
      document.getElementById('loginForm').style.display = 'none';
    }
  };

  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);