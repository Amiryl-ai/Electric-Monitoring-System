// Web app's firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDog3mejRM-rNYf-odGWyS_vLYIOJvCN0c",
    authDomain: "userdata-d6a62.firebaseapp.com",
    databaseURL: "https://userdata-d6a62-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "userdata-d6a62",
    storageBucket: "userdata-d6a62.appspot.com",
    messagingSenderId: "560979460061",
    appId: "1:560979460061:web:f78e9f8ea21a09cab84034"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Variable
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Set up Signup function
  function signUpForm() {
    var username = document.getElementById('username').value;
    var full_name = document.getElementById('full_name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is out of line');
      return;
    }
  
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
      .then(function () {
        var user = auth.currentUser;
  
        // Add user to Firebase Database
        var database_ref = database.ref();
  
        var user_data = {
          username: username,
          full_name: full_name,
          email: email,
          last_login: Date.now()
        };
  
        database_ref.child('user/' + user.uid).set(user_data);
  
        alert('User Created!!');
      })
      .catch(function (error) {
        alert(error.message);
      });
  
    if (validate_field(username) == false || validate_field(full_name) == false) {
      alert('One or More input field is out of line!!');
      return;
    }
  }
  
// Setup our Login function
function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is out of line');
      return;
    }
  
    auth.signInWithEmailAndPassword(email, password)
      .then(function () {
        var user = auth.currentUser;
        console.log('User authenticated:', user);
  
        var userRef = database.ref('user/' + user.uid); // Update the path here
  
        userRef.once('value')
          .then(function (snapshot) {
            console.log('Snapshot:', snapshot.val()); // Log snapshot for debugging
  
            if (snapshot.val() !== null) { // Check if snapshot value is not null
              var user_data = {
                last_login: Date.now()
              };
              userRef.update(user_data);
  
              window.location.href = '../Index/index.html';
            } else {
              alert('User not found in database.');
            }
          })
          .catch(function (error) {
            console.error('Error checking user existence:', error);
            alert('Error checking user existence. Please try again.');
          });
      })
      .catch(function (error) {
        alert(error.message);
      });
  }
  

  
  function validate_email(email) {
    var expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return expression.test(email);
  }
  
  function validate_password(password) {
    return password.length >= 6;
  }
  
  function validate_field(field) {
    return field != null && field.trim() !== '';
  }
  