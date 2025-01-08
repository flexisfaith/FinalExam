import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check for user authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    document.getElementById('user-name').textContent = user.displayName || "User";
    document.getElementById('user-email').textContent = user.email;
  } else {
    // No user is signed in, redirect to login
    window.location.href = 'login.html';
  }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
  signOut(auth).then(() => {
    alert('Logged out successfully.');
    window.location.href = 'login.html';
  }).catch((error) => {
    alert('Error logging out: ' + error.message);
  });
});
