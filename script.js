import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDndCJeOmnvGGFGc_nX8gqHjWxekIMFLVI",
    authDomain: "stock-market-game-eb548.firebaseapp.com",
    databaseURL: "https://stock-market-game-eb548.firebaseio.com",
    projectId: "stock-market-game-eb548",
    storageBucket: "stock-market-game-eb548.appspot.com",
    messagingSenderId: "146474488765",
    appId: "1:146474488765:web:dbed97ce363e4b28cd78d4"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let currentUser = null;
let stockPrice = 0;

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(username, password)
        .then(userCredential => {
            currentUser = userCredential.user;
            document.getElementById('auth').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            document.getElementById('user-name').innerText = username;
            fetchStockPrice();
        })
        .catch(error => {
            alert(error.message);
        });
}

// Signup Function
function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(username, password)
        .then(userCredential => {
            currentUser = userCredential.user;
            alert('User created successfully!');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Fetch stock price from database
function fetchStockPrice() {
    const stockRef = db.ref('stock/price');
    stockRef.on('value', snapshot => {
        stockPrice = snapshot.val() || 0;
        document.getElementById('stock-price').innerText = `$${stockPrice}`;
    });
}

// Buy stock function
function buyStock() {
    stockPrice++;
    db.ref('stock').set({ price: stockPrice });
}

// Sell stock function
function sellStock() {
    if (stockPrice > 0) {
        stockPrice--;
        db.ref('stock').set({ price: stockPrice });
    }
}
