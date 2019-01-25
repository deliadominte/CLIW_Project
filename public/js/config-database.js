// Initialize Firebase
const config = {
    apiKey: "AIzaSyAiGueOVX_zj7xj_uYhvZs9COk2Z9i8NxM",
    authDomain: "metoo-e3012.firebaseapp.com",
    databaseURL: "https://metoo-e3012.firebaseio.com",
    projectId: "metoo-e3012",
    storageBucket: "metoo-e3012.appspot.com",
    messagingSenderId: "660129927368"
};

firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});