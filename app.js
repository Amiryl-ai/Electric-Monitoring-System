// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Add event listeners for buttons
  const generateReportBtn = document.getElementById("generateReportBtn");
  const signOutBtn = document.getElementById("signOutBtn");
  
  generateReportBtn.addEventListener("click", () => {
    // Add report generation logic here
    alert("Report generation is not implemented yet.");
  });
  
  signOutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      window.location.replace("signin.html");
    });
  });
   
  