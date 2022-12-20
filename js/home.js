// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

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
  remove,
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
  measurementId: "G-B5J599F2J0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

///initialize authentication
const auth = getAuth();

//initialize database
const db = getDatabase();

// ---------------------// Get reference values -----------------------------
let userLink = document.getElementById("userLink");
let signOutLink = document.getElementById("signOut");
let welcome = document.getElementById("welcome");
let currentUser = null;

// ----------------------- Get User's Name'Name ------------------------------
function getUsername() {
  //grab value for key logged in switch
  let keeptLoggedIn = localStorage.getItem("keepLoggedIn");

  if (keeptLoggedIn == "yes") {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem("user"));
  }

  currentUser = currentUser.accountInfo;
}

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD
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

// ------------------------Set (insert) data into FRD ------------------------

// -------------------------Update data in database --------------------------
function updateData(cond, trial, mass, userID) {
  // Set the data
  update(ref(db, `users/${userID}/data/${cond}`), {
    [trial]: mass,
  })
    .then(() => {
      alert("Data updated successfully!");
    })
    .catch((error) => {
      alert(`Error: ${error.code} - ${error.message}`);
    });
}

document.getElementById("update").onclick = function () {
  const cond = document.getElementById("condition").value;
  const trial = document.getElementById("trial").value;
  const mass = document.getElementById("mass").value;
  const userID = currentUser.uid;

  updateData(cond, trial, mass, userID);
};

// ----------------------Get a datum from FRD (single data point)---------------

// ---------------------------Get a month's data set --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph

// Add a item to the table of data

// -------------------------Delete a day's data from FRD ---------------------

// --------------------------- Home Page Loading -----------------------------

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
    welcome.innerText = "Welcome, " + currentUser.firstName;

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

// ------------------------- Set Welcome Message -------------------------

// Get, Set, Update, Delete Sharkriver Temp. Data in FRD
// Set (Insert) data function call

// Update data function call

// Get a datum function call
function getDatum(cond, trial, userID) {
  // Get the data
  let condVal = document.getElementById("conditionVal");
  let trialVal = document.getElementById("trialVal");
  let massVal = document.getElementById("massVal");

  const dbref = ref(db);

  get(child(dbref, `users/${userID}/data/${cond}/${trial}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
		console.log(snapshot.val());
        condVal.textContent = cond;
        trialVal.textContent = trial;
        massVal.textContent = snapshot.val();
      } else {
        alert("No data available");
      }
    })
    .catch((error) => {
      alert(`Error: ${error.code} - ${error.message}`);
    });
}

document.getElementById("get").onclick = function () {
  const cond = document.getElementById("getCondition").value;
  const trial = document.getElementById("getTrial").value;
  const userID = currentUser.uid;

  getDatum(cond, trial, userID);
};

// Get a data set function call
async function getDataSet(cond, userID) {
  let condVal = document.getElementById("setConditionVal");
  condVal.textContent = `Condition: ${cond}`;

  const trials = [];
  const masses = [];
  const tbodyE1 = document.getElementById("tbody-2");

  const dbref = ref(db);

  await get(child(dbref, `users/${userID}/data/${cond}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          trials.push(childSnapshot.key);
          masses.push(childSnapshot.val());
        });
      } else {
        alert("No data available");
      }
    })
    .catch((error) => {
      alert(`Error: ${error.code} - ${error.message}`);
    });

  tbodyE1.innerHTML = "";
  for (let i = 0; i < trials.length; i++) {
    addItemToTable(trials[i], masses[i], tbodyE1);
  }
}

document.getElementById("getDataSet").onclick = function () {
  const cond = document.getElementById("getConditionSet").value;
  const userID = currentUser.uid;

  getDataSet(cond, userID);
};

function addItemToTable(trial, mass, tbody) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");

  td1.textContent = trial;
  td2.textContent = mass;

  tr.appendChild(td1);
  tr.appendChild(td2);

  tbody.appendChild(tr);
}

// Delete a single day's data function call
function deleteData(cond, trial, userID) {
  remove(ref(db, `users/${userID}/data/${cond}/${trial}`))
    .then(() => {
      alert("Data deleted successfully");
    })
    .catch((error) => {
      alert(`Error: ${error}`);
    });
}

document.getElementById("delete").onclick = function () {
  const cond = document.getElementById("delCondition").value;
  const trial = document.getElementById("delTrial").value;
  const userID = currentUser.uid;

  deleteData(cond, trial, userID);
};

// Delete a single day's data function call
