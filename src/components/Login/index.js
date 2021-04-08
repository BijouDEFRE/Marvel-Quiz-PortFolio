import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const Login = (props) => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [password, email, btn])
    
    /* version avec une fonction en dehors */
    /*const handleEmail = event => {
        setEmail(event.target.value);
    } */
    
    /* version avec le setter directement invoqué dans une fonction fléchée */
    /* <input onChange={event => setPassword(event.target.value)} value={password}..... */

    const handleSubmit = event => {
        event.preventDefault();

        firebase.loginUser(email, password)
        .then(user => {
            console.log(user);
            setEmail('');
            setPassword('');
            props.history.push('/welcome')
        })
        .catch(error => {
            setError(error);
            setEmail('');
            setPassword('');
        })
    }

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {error !== '' && <span>{error.message}</span>}
                        
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={event => setEmail(event.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={event => setPassword(event.target.value)} value={password} type="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            { btn ? <button>Connexion</button> : <button disabled>Connexion</button> }

                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">Nouveau sur Marvel Quiz ? Insrivez-vous maintenant.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;