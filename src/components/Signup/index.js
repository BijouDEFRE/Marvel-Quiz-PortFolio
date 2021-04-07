import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';

const Signup = () => {

    const firebase = useContext(FirebaseContext);
    // console.log(firebase);

    const data = {
        pseudo:'',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [loginData, setloginData] = useState(data);
    const [error, setError] = useState('');

    const handleChange = event => {
        setloginData({...loginData, [event.target.id]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { email, password } = loginData;
        firebase.signupUser(email, password)
        .then(user => {
            setloginData({...data})
        })
        .catch(error => {
            setError(error);
            setloginData({...data})
        })
    }

    const { pseudo, email, password, confirmPassword } = loginData;

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <button disabled>Inscrition</button> : <button>Inscrition</button>

    // gestion des erreurs
    const errorMsg = error !== '' && <span>{}error.message</span>

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        
                        {errorMsg}

                    <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>

                            {btn}           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;