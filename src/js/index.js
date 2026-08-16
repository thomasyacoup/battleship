import '../css/style.css';

function init() {
  const app = document.getElementById('app');
  if (app) {
    const message = document.createElement('p');
    message.textContent = 'Welcome to Battleship game!';
    app.appendChild(message);
  }
}

document.addEventListener('DOMContentLoaded', init);
