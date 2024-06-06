document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Collect form data
    const username = document.getElementById('username').value;
    const fullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Firebase sign up
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
  
        // Save additional user info to Firebase database
        firebase.database().ref('users/' + user.uid).set({
          username: username,
          fullName: fullName,
          email: email
        });
  
        // Redirect to sign-in page or another page
        window.location.href = 'signin.html';
      })
      .catch((error) => {
        const errorMessage = error.message;
        document.getElementById('signUpError').textContent = errorMessage;
      });
  });
  