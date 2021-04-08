import app from 'firebase/app';
import 'firebase/auth';

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
    }

    // insriptions
    signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    // Connexions
    loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    //Déconnexions
    signoutUser = () => this.auth.signOut();
}

export default Firebase;

// class Firebase {
//     constructor() {
//       app.initializeApp(config);
//       this.auth = app.auth();
//     }
  
//     // Inscription
//     signupUser = (email, password) => {
//       return (
//         this.auth.createUserWithEmailAndPassword(email, password)
//       )
//     }
  
//     // Connexion
//     loginUser = (email, password) => {
//       return (
//         this.auth.signInWithEmailAndPassword(email, password)
//       )
//     }
  
//     // Deconnexion
//     signoutUser = () => this.auth.signOut()
//   }