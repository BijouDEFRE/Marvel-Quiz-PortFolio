import app from 'firebase/app';

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
        app.initializeApp(config)
    }
}

export default Firebase;