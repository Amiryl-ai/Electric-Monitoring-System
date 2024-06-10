// Import Firebase modules from CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database-compat.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js';
import { auth, database2 } from '../Firebase/app.js'; // Import auth and database2 from your Firebase configuration file

document.getElementById('signUpForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Add user data to the database
      const userData = {
        username: username,
        name: name,
        email: email,
        uid: user.uid,
        signUpDate: new Date().toISOString()
      };

      set(ref(database2, 'users/' + user.uid), userData)
        .then(() => {
          console.log('User data saved to database2.');
          alert('Data has been uploaded successfully.');
          window.location.href = './Index/index.html'; // Redirect after successful sign-up
        })
        .catch((error) => {
          console.error('Error saving user data to database2:', error);
          alert('Data not uploaded: ' + error.message);
          document.getElementById('signUpError').textContent = error.message;
        });
    })
    .catch((error) => {
      const errorMessage = error.message;

      if (error.code === 'auth/email-already-in-use') {
        alert('The email address is already in use. Please try signing in instead.');
      } else {
        alert('Data not uploaded: ' + errorMessage);
      }

      document.getElementById('signUpError').textContent = errorMessage;
    });
});
