import { API_AUTH_REGISTER, API_KEY } from '../constants.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms['register'];

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const requestBody = JSON.stringify({
      name: name, 
      email: email,
      password: password,
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);

    try {
      const response = await fetch(API_AUTH_REGISTER, {
        method: 'POST',
        headers: myHeaders,
        body: requestBody,
        redirect: 'follow',
      });
      
      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! You can now log in.');
        window.location.href = '/auth/login/';
      } else {
        console.log('Response status:', response.status);
        console.log('Response data:', data);
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Error connecting to the server.');
      console.error('Error:', error);
    }
  });
});