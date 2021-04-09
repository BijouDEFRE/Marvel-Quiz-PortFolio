import React, { useState, Fragment, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import Logout from '../Logout';
import Quiz from '../Quiz';

// on passe le "props" pour accéder à history et push
const Welcome = props => {

    // chargement du useContext de firebase
    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);

    useEffect(() => {
        // methode "listener" fournie par Firebase qui permet de détecter un user identifier
        let listener = firebase.auth.onAuthStateChanged(user => {
            // condition : pas de user identifié, je redirige vers la page /
            user ? setUserSession(user) : props.history.push('/')
        });

        return () => {
            // on arrête le composant
            listener()
        }
        // pas besoin de dépendance donc [] vide
    }, [])

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p>Loading...</p>
        </Fragment>
    ) : (
        // si le user existe, on renvoie vers la page quiz
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz />
            </div>
        </div>
    )
}

export default Welcome;