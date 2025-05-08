import { db } from './firebase.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

console.log('script.js loaded');

const userForm = document.getElementById('bio-online-form');
const successMessage = document.getElementById('success-message');

if (!userForm || !successMessage) {
    console.error('Form or success message element not found');
}

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submission triggered');

    const email = document.getElementById('email').value.trim();

    successMessage.style.height = '0';
    successMessage.style.minHeight = '0';
    successMessage.style.overflow = 'hidden';

    if (email === '') {
        successMessage.textContent = 'Please enter an email address.';
        successMessage.style.color = '#ff0000';
        successMessage.style.height = '1rem';
        successMessage.style.minHeight = '1rem';
        setTimeout(() => {
            successMessage.style.height = '0';
            successMessage.style.minHeight = '0';
            successMessage.style.overflow = 'hidden';
        }, 3000);
        return;
    }

    if (!email.includes('@')) {
        successMessage.textContent = 'Please enter a valid email address (must include @).';
        successMessage.style.color = '#ff0000';
        successMessage.style.height = '1rem';
        successMessage.style.minHeight = '1rem';
        setTimeout(() => {
            successMessage.style.height = '0';
            successMessage.style.minHeight = '0';
            successMessage.style.overflow = 'hidden';
        }, 3000);
        return;
    }

    try {
        console.log('Attempting to save to Firestore');
        await addDoc(collection(db, 'subscribers'), {
            email,
            timestamp: new Date()
        });
        console.log('Showing success message');
        successMessage.textContent = 'Subscribed successfully! Thank you!';
        successMessage.style.color = '#39b230';
        successMessage.style.height = '1.5rem';
        successMessage.style.minHeight = '1.5rem';
        userForm.reset();

        setTimeout(() => {
            successMessage.style.height = '0';
            successMessage.style.minHeight = '0';
            successMessage.style.overflow = 'hidden';
        }, 3000);
    } catch (error) {
        console.error('Firebase error:', error);
        successMessage.textContent = 'Error: ' + error.message;
        successMessage.style.color = '#ff0000';
        successMessage.style.height = '1rem';
        successMessage.style.minHeight = '1rem';
        setTimeout(() => {
            successMessage.style.height = '0';
            successMessage.style.minHeight = '0';
            successMessage.style.overflow = 'hidden';
        }, 3000);
    }
});