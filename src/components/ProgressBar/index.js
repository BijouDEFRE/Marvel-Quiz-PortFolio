import React, { Fragment } from 'react';

// on utilise le destructuring pour récupérer les props depuis le composant "Quiz" ({questionId, maxQuestions})
const ProgressBar = ({questionId, maxQuestions}) => {
    // console.log(questionId, maxQuestions);

    const getWidth = (totalQuestions, questionId) => {
        return (100 / totalQuestions) * questionId;
    };

    // on créer nos méthodes pour les placées dans notre JSX
    const actualQuestion = questionId + 1;
    const progresPercent = getWidth(maxQuestions, actualQuestion);

    console.log(progresPercent)
    
    return (
        <Fragment>
        <div className="percentage">
            <div className="progressPercent">{`Question: ${questionId +1}/${maxQuestions}`}</div>
            <div className="progressPercent">{`Progression: ${progresPercent}%`}</div>
        </div>
        <div className="progressBar">
            <div className="progressBarChange" style={{width: `${progresPercent}%`}}></div>
        </div>
        </Fragment>
    )
}
/* pour éviter de recharger les composants dont le state n'a pas été modifié
on utilise React.memo (équivalent à pureComponent dans élément de type class)
ici nous sommes dans élémnet de type function on doit donc utiliser React.memo */
export default React.memo(ProgressBar);