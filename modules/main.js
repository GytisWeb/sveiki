import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import{getDatabase, set, update, ref} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { firebaseConfig } from "./firebase_example.js";
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


const registerNewUser = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        const loginTime = new Date();
        set(ref(database, "users/" + user.uid), {
            email: email,
            role: "simple_user",
            timestamp: `${loginTime}`
        });
        console.log("New User Created", user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}

const loginUser = (e) => {
    e.preventDefault();
    const login_email = document.getElementById("email").value
    const login_password = document.getElementById("password").value

    signInWithEmailAndPassword(auth, login_email, login_password)
    .then((userCredential) => {
        const user = userCredential.user;
        const loginTime = new Date();
        update(ref(database, "users/" + user.uid), {
            last_login: loginTime
        })
        console.log(user, "Login successful");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });

}


document.getElementById("signUp").addEventListener("click", registerNewUser);
document.getElementById("signIn").addEventListener("click", loginUser);


