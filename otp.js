import { auth } from './firebase-config.js';
import { signInWithEmailLink, sendSignInLinkToEmail } from "firebase/auth";

function sendOTP() {
    const email = document.getElementById('email').value;
    const actionCodeSettings = {
        url: 'http://localhost:5000/dashboard.html',
        handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        alert('OTP sent to email');
    })
    .catch(error => {
        console.error('Error sending OTP', error);
    });
}
