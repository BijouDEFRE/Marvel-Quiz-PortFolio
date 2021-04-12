import React, { Fragment } from 'react';

/* afin de récupérer les "props/refs" dans un composant de type function,
on doit utiliser la technique "React.forwardRef".
https://fr.reactjs.org/docs/forwarding-refs.html
exemple Warnig dans la console: Function components cannot be given refs.
Attempts to access this ref will fail. Did you mean to use React.forwardRef()?*/

const QuizOver = React.forwardRef((props, ref) => {
    console.log(props);
    console.log(ref);
    return (
        <Fragment>
            <div className="stepsBtnContainer">
                <p className="successMsg">Bravo vous êtes un expert !</p>
                <button className="btnResult success">Niveau Suivant</button>
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite : 10%</div>
                <div className="progressPercent">Note : 10/10</div>
            </div>

            <hr />
            <p>Les réponses aux questions posées :</p>
        </Fragment>
    )
})
/* pour éviter de recharger les composants dont le state n'a pas été modifié
on utilise React.memo => (équivalent à pureComponent dans élément de type class)
ici nous sommes dans élémnet de type function on doit donc utiliser React.memo */
export default React.memo(QuizOver);