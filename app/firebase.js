document.getElementById('loader').style.display = 'flex';
document.getElementById('container').style.display = 'none';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpANGD5onD8YAKgtf162aZxLzM8mh54Io",
    authDomain: "centrlbytrygve.firebaseapp.com",
    projectId: "centrlbytrygve",
    storageBucket: "centrlbytrygve.appspot.com",
    messagingSenderId: "351177071714",
    appId: "1:351177071714:web:d4b077e65c6f93e64e853b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

var uid;
var init = false;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        uid = user.uid;
        init = true;
        document.getElementById('loader').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        popup("Logged in!", "yellowgreen")
    } else {
        // User is signed out
        init = true;
        document.getElementById('loader').style.display = 'none';
        document.getElementById('container').style.display = 'block';
        popup("Not logged in!", "gray")
    }
});

while (init == false) {
    if (init == true) {
        break;
    }
    await new Promise(r => setTimeout(r, 100));
}

document.getElementById('login-btn').addEventListener('click', () => {
    popup("Feature not implemented!", "orange")
    // signInWithPopup(auth, provider);
    disableBtn("login-btn");
})

function popup(t, c) {
    var template = document.getElementById('popup-template');
    var clone = template.content.cloneNode(true);
    clone.getElementById('popup-text').textContent = t;
    clone.getElementById('popup').style.backgroundColor = c;
    document.getElementById('popup-feed').appendChild(clone);


    setTimeout(() => {
        document.getElementById('popup').style.animation = 'none';
        document.getElementById('popup').style.animation = 'faderout 0.25s linear';
        setTimeout(() => {
            document.getElementById('popup-feed').removeChild(document.getElementById('popup'))
        }, 250)
    }, 9750)
}

function disableBtn(el) {
    document.getElementById(el).disabled = true;
    setTimeout(() => {
        document.getElementById(el).disabled = false;
    }, 1000)
}