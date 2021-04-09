import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const ForgetPassword = () => {

    // mise en place du context
    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState("");
    /* on vérifie notre handler */
    /* console.log(email); */

    const handleSubmit = event => {
        event.preventDefault();
        // méthode de firebase
        firebase.passwordReset(email)
    }

    // gestion de l'affichage du bouton
    const disabled = email === ""

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        
                        <h2>Mot de passe oublié ?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={event => setEmail(event.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Récupérer</button>

                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword