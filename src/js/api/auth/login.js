import { API_AUTH_LOGIN, API_KEY } from '../constants.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms['login'];

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = form.email.value;
    const password = form.password.value;

    const requestBody = JSON.stringify({
      email: email,
      password: password,
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);

    try {
      const response = await fetch(API_AUTH_LOGIN, {
        method: 'POST',
        headers: myHeaders,
        body: requestBody,
        redirect: 'follow',
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
       
        localStorage.setItem('authToken', token);

        alert('Login successful! Redirecting to your dashboard.');
        window.location.href = '/profile/index.html'; 
      } else {
        console.log('Response status:', response.status);
        console.log('Response data:', data);
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      alert('Error connecting to the server.');
      console.error('Error:', error);
    }
  });
});