import React from 'react';

const ForgetPassword = () => {
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

export default ForgetPassword