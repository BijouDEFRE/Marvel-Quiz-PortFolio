import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyB6aUEcKGB97V7p1LHWQg-j_mL6TsF2dw4",
    authDomain: "marvel-quiz-4e882.firebaseapp.com",
    projectId: "marvel-quiz-4e882",
    storageBucket: "marvel-quiz-4e882.appspot.com",
    messagingSenderId: "534937583130",
    appId: "1:534937583130:web:2e025ee05a5d88ea235ba3"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        // Firestore Cloud gestionnaire noSQL fourni par Firebase
        this.db = app.firestore();
    }

    // Insriptions
    signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    // Connexions
    loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    //Déconnexions
    signoutUser = () => this.auth.signOut();

    // Récupération du mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    /*Exemple fourni par la Doc de Firebase :
    https://firebase.google.com/docs/firestore/data-model */
    user = userId => this.db.doc(`users/${userId}`);
}

export default Firebase;