// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsUugw1xB649Dju4KxW8rFNuT8vXwWyVk",
  authDomain: "electricmonitor-fb.firebaseapp.com",
  projectId: "electricmonitor-fb",
  storageBucket: "electricmonitor-fb.appspot.com",
  messagingSenderId: "912223219561",
  appId: "1:912223219561:web:6ded95ba6bbfe5414e57f8D"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('signInForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Collect form data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Firebase sign in
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;

      // Redirect to dashboard or another page
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorMessage = error.message;
      document.getElementById('signInError').textContent = errorMessage;
    });
});
