// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getAuth,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import {
	getDatabase,
	ref,
	set,
	update,
	child,
	get,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCadfrd6XzNvlCPXvvPOdT5tQYnxHeoZCQ",
  authDomain: "researchwebsite-fe9f0.firebaseapp.com",
  projectId: "researchwebsite-fe9f0",
  storageBucket: "researchwebsite-fe9f0.appspot.com",
  messagingSenderId: "370615428879",
  appId: "1:370615428879:web:1767662f3964df9bd5c07a",
  measurementId: "G-B5J599F2J0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

///initialize authentication
const auth = getAuth();

//initialize database
const db = getDatabase();

let userLink = document.getElementById("userLink");
let signOutLink = document.getElementById("signOut");
let currentUser = null;

function getUsername() {
	//grab value for key logged in switch
	let keeptLoggedIn = localStorage.getItem("keepLoggedIn");

	if (keeptLoggedIn == "yes") {
		currentUser = JSON.parse(localStorage.getItem("user"));
	} else {
		currentUser = JSON.parse(sessionStorage.getItem("user"));
	}

	currentUser = currentUser.accountInfo;
    console.log(currentUser);
}

function signOutUser() {
	// Clear session and localStorage
	sessionStorage.removeItem("user");
	localStorage.removeItem("user");
	localStorage.removeItem("keepLoggedIn");

	signOut(auth)
		.then(() => alert("Sign out successful"))
		.catch((error) => alert(`Error: ${error.code} - ${error.message}`));

	//reload the page
	location.reload();
}

window.onload = function () {
	getUsername();

	if (currentUser == null) {
		userLink.innerText = "Register";
		userLink.classList.replace("nav-link", "btn");
		userLink.classList.add("btn-primary");
		userLink.href = "register.html";

		signOutLink.innerText = "Sign In";
		signOutLink.classList.replace("nav-link", "btn");
		signOutLink.classList.add("btn-success");
		signOutLink.href = "signIn.html";
	} else {
		console.log(currentUser);

		userLink.innerText = currentUser.firstName;
		userLink.classList.replace("btn", "nav-link");
		userLink.classList.add("btn-primary");
		userLink.href = "#";

		signOutLink.innerText = "Sign Out";
		signOutLink.classList.replace("btn", "nav-link");
		signOutLink.classList.add("btn-success");
		signOutLink.addEventListener("click", (e) => {
			e.preventDefault();
			signOutUser();
		});
	}
};
