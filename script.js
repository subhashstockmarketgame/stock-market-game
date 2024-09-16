// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
