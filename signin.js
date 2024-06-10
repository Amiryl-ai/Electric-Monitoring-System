// Import Firebase modules from CDN
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js';
import { auth, database2 } from '../Firebase/app.js'; // Import auth and database2 from your Firebase configuration file

document.getElementById('signInForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Check if the user data is in database2
      database2.ref('users/' + user.uid).once('value')
        .then((snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            console.log('User data found in database2:', userData);
            alert('Welcome back!');
            window.location.href = './Index/index.html'; // Redirect after successful sign-in
          } else {
            console.log('User data not found in database2.');
            alert('User data not found.');
            // Handle redirection or display appropriate message for user not found in database2
          }
        })
        .catch((error) => {
          console.error('Error checking user data in database2:', error);
          alert('Error checking user data.');
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert('Sign in failed: ' + errorMessage);
      document.getElementById('signInError').textContent = errorMessage;
    });
});
