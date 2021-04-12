import React, { Fragment, useEffect, useState } from 'react';

/* afin de récupérer les "props/refs" dans un composant de type function,
on doit utiliser la technique "React.forwardRef".
https://fr.reactjs.org/docs/forwarding-refs.html
exemple Warnig dans la console: Function components cannot be given refs.
Attempts to access this ref will fail. Did you mean to use React.forwardRef()?*/

const QuizOver = React.forwardRef((props, ref) => {
    // console.log(props);
    // console.log(ref);

    // on récupère toutes les questions
    const [asked, setAsked] = useState([]);
    // console.log(asked);

    // cette fonction s'enclanche à chaque modification de "ref"
    useEffect(() => {
        setAsked(ref.current)
        // on créer la dépendance pour récupérer les datas
    }, [ref])

    // on "map" sur le résultat afin de recréer un tableau avec les datats récupérées
    // on créer une function pour pouvoir l'afficher dans le JSX
    const datasAnswer = asked.map(datas => {
        // on créer un élément "parent" que l'on veut répéter plusieurs fois
        // pour cela, il faut créer un "key" (id)
        return (
            <tr key={datas.id}>
                <td>{datas.id + 1}</td>
                <td>{datas.question}</td>
                <td>{datas.answer}</td>
                <td>
                    <button className="btnInfo">Infos</button>
                </td>
            </tr>
        )
    })

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

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        { datasAnswer }
                    </tbody>
                </table>
            </div>

        </Fragment>
    )
})
/* pour éviter de recharger les composants dont le state n'a pas été modifié
on utilise React.memo => (équivalent à pureComponent dans élément de type class)
ici nous sommes dans élémnet de type function on doit donc utiliser React.memo */
export default React.memo(QuizOver);