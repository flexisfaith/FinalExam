import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// View Users
document.getElementById('view-users').addEventListener('click', async () => {
  const userList = document.getElementById('users');
  userList.innerHTML = ''; // Clear list before loading
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  
  snapshot.forEach((doc) => {
    const user = doc.data();
    const listItem = document.createElement('li');
    listItem.textContent = `${user.name} - ${user.email}`;
    userList.appendChild(listItem);
  });

  document.getElementById('user-list').classList.remove('hidden');
});

// Add User (Mock)
document.getElementById('add-user').addEventListener('click', async () => {
  const name = prompt('Enter user name:');
  const email = prompt('Enter user email:');

  if (name && email) {
    await addDoc(collection(db, 'users'), { name, email });
    alert('User added successfully!');
  } else {
    alert('Please enter valid details.');
  }
});

// Logout
document.getElementById('logout').addEventListener('click', () => {
  signOut(auth).then(() => {
    alert('Logged out!');
    window.location.href = 'login.html';
  });
});
