   // Import Firebase SDK
   import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
   import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

   // Firebase configuration
   const firebaseConfig = {
       apiKey: "AIzaSyD53oyOKX0rQHVP5WXm6mQQT6yMxRY3Oto",
       authDomain: "bioera-test-v0.firebaseapp.com",
       projectId: "bioera-test-v0",
       storageBucket: "bioera-test-v0.firebasestorage.app",
       messagingSenderId: "109807797212",
       appId: "1:109807797212:web:64f9838578af64ecb24519",
       measurementId: "G-TEPZXTY17G"
   };

   // Initialize Firebase
   try {
       const app = initializeApp(firebaseConfig);
       window.db = getFirestore(app);
       console.log('Firebase initialized successfully');
   } catch (error) {
       console.error('Firebase initialization failed:', error);
       document.getElementById('message').textContent = 'Failed to connect to Firebase.';
       document.getElementById('message').className = 'mt-4 text-left text-red-800';
   }

   // Submit email function
   window.submitEmail = async function() {
       const emailInput = document.getElementById('email').value;
       const messageElement = document.getElementById('message');

       if (!emailInput) {
           messageElement.textContent = 'Please enter an email.';
           messageElement.className = 'mt-4 text-left text-red-800';
           return;
       }
       // Validate email format
       const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
       if (!emailRegex.test(emailInput)) {
           messageElement.textContent = 'Please enter a valid email with "@" and a domain.';
           messageElement.className = 'mt-4 text-left text-red-800';
           return;
       }
       try {
           await addDoc(collection(window.db, 'emails'), {
               email: emailInput,
               timestamp: serverTimestamp()
           });
           messageElement.textContent = 'Email submitted successfully!';
           messageElement.className = 'mt-4 text-left text-green-500';
           document.getElementById('email').value = '';
       } catch (error) {
           console.error('Error adding email:', error.message, error.code);
           messageElement.textContent = `Wrong email`;
           messageElement.className = 'mt-4 text-left text-red-800';
       }
   };