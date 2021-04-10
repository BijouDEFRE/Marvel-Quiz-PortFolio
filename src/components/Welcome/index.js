import React, { useState, Fragment, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import Logout from '../Logout';
import Quiz from '../Quiz';

// on passe le "props" pour accéder à history et push
const Welcome = props => {

    // chargement du useContext de firebase
    const firebase = useContext(FirebaseContext);
    // par défaut on met le state à null
    const [userSession, setUserSession] = useState(null);
    /* on créer une variable pour récupérer les infos de user,
    afin de pouvoir les faire passer aux composants que l'on souhaite
    par défaut, au chargement on à rien ({}) */
    const [userData, setUserData] = useState({});
    
    // cette callback function ne s'enclanche qu'une fois
    useEffect(() => {
        // methode "listener" fournie par Firebase qui permet de détecter un user identifier
        let listener = firebase.auth.onAuthStateChanged(user => {
            // condition : pas de user identifié, je redirige vers la page /
            user ? setUserSession(user) : props.history.push('/')
        });

        // si on est différent de null (!!) on à acces à "user"
        if (!!userSession) {
            firebase.user(userSession.userId)
            .get()
            .then( userInfo => {
                if (userInfo && userInfo.exists) {
                    const data = userInfo.data();
                    setUserData(data)
                }
            })
            .catch( error => {
                console.log(error);
            })
        };

        return () => {
            // on arrête le composant
            listener()
        }
        // si il y à un changement au niveau de "userSession", on relance la la fonction
    }, [userSession])

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
                {/* ici je créer mon "props" pour le récupérer dans le composant "Quiz" */}
                <Quiz userData={userData}/>
            </div>
        </div>
    )
}

export default Welcome;