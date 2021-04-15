import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import Loader from '../Loader';
import Modal from '../Modal';

/* afin de récupérer les "props/refs" dans un composant de type function,
on doit utiliser la technique "React.forwardRef".
https://fr.reactjs.org/docs/forwarding-refs.html
exemple Warnig dans la console: Function components cannot be given refs.
Attempts to access this ref will fail. Did you mean to use React.forwardRef()?*/

const QuizOver = React.forwardRef((props, ref) => {
    // console.log(props);
    // console.log(ref);
    
    // ici on peut faire le destructuring pour avoir acces aux "props"
    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props;
    // console.log(percent);

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
    console.log(API_PUBLIC_KEY);

    // const hash ='856129469804F07E7079C61E24C3D23B';
    const hash ='5daddad6f060b32ee6ab13127f1df6bd';
    console.log(hash);
    console.log(`https://gateway.marvel.com/v1/public/characters/1009362?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`);
    
    // on récupère toutes les questions
    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [characterInfos, setCharacterInfos] = useState();
    const [loading, setLoading] = useState(true);
    // console.log(asked);
    
    // cette fonction s'enclanche à chaque modification de "ref"
    useEffect(() => {
        setAsked(ref.current)
        // au montage du composant, on check le localStorage
        if ( localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate');
            checkDataAge(date);
        }
        // on créer la dépendance pour récupérer les datas
    }, [ref])

    // on définie une méthode pour vérifier "l'age" de la data
    const checkDataAge = date => {

        const today = Date.now();
        const timeDifference = today - date;
        /* les dates étant calculées en milisecondes, un calcul
         nous permet de définir le nombres de jours avant de vider le localStorage */
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        // ici nous choisissont 15 jours avant de "clear" le localStorage
        if ( daysDifference >= 15 ) {
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', Date.now());
        }
    }
    
    const showModal = id => {
        setOpenModal(true);

        /* on met en place une condition pour vérifier que les datas
        sont présentent ou non dans le localStorage */
        if ( localStorage.getItem(id) ) {
            // si les données sont existantes dans le localStorage
            setCharacterInfos(JSON.parse(localStorage.getItem(id)));
            setLoading(false);

        } else {

            axios
            .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
            .then(response => {
                setCharacterInfos(response.data);
                // on à récupérer les infos on "coupe" le loader
                setLoading(false);
    
                // on stoque les infos récupérées dans notre "localstorage"
                // on utilise JSON.stringify car (response.data) est un objet !!!!
                // on ne peut pas stoquer d'objet dans le localstorage !!! mais un chaine de caractères
                localStorage.setItem(id, JSON.stringify(response.data));
    
                // on créer une condition pour créer ou non une date dans le localstorage
                // pour enregistrer de la data on utilise "set" pour en récupérer n utilise "get"
                if ( !localStorage.getItem('marvelStorageDate') ) {
                    localStorage.setItem('marvelStorageDate', Date.now());
                }
            })
            .catch(error => {console.log(error)})
        }
    }
        
    
    const closeModal = () => {
        setOpenModal(false);
        // on ferme le "modal" on "réactive" le loader
        setLoading(true);
    }

    const averageGrade = maxQuestions / 2;
    // une condition pour passer au niveau supérieur
    if (score < averageGrade) {
        // setTimeout(() => loadLevelQuestions(0), 3000)
        setTimeout(() => loadLevelQuestions(quizLevel), 3000)
    }

    const decision = score >= averageGrade ? (
        <Fragment>
            <div className="stepsBtnContainer">
     {
         quizLevel < levelNames.length ?
         (
             <Fragment>
                 <p className="successMsg">Bravo, passez au niveau suivant !</p>
                 {/* ici on rajoute un évenement (onClick)
                 qui va lancer la méthode loadLevelQuestions
                 qui se trouve dans le composant Quiz */}
                 <button
                    className="btnResult success"
                    onClick={() => loadLevelQuestions(quizLevel)}
                 >
                    Niveau Suivant
                 </button>
             </Fragment>
         )
         :
         (
             <Fragment>
                 <p className="successMsg">
                    <GiTrophyCup size='50px' /> Bravo, vous êtes un expert !
                 </p>
                 <button
                    className="btnResult gameOver"
                    onClick={() => loadLevelQuestions(0)}
                >
                    Accueil
                </button>
             </Fragment>
         )
     }       
        </div>
        <div className="percentage">
            <div className="progressPercent">Réussite : {percent} %</div>
            <div className="progressPercent">Note : {score}/{maxQuestions}</div>
        </div>
        </Fragment>
    )
    :
    (
        <Fragment>
        <div className="stepsBtnContainer">
            <p className="failureMsg">Vous avez échoué !</p>
        </div>

        <div className="percentage">
            <div className="progressPercent">Réussite : {percent} %</div>
            <div className="progressPercent">Note : {score}/{maxQuestions}</div>
        </div>
        </Fragment>
    )

    // on "map" sur le résultat afin de recréer un tableau avec les datats récupérées
    // on créer une function pour pouvoir l'afficher dans le JSX
    // une condition pour afficher les réponse à la fin de la série (au moins 50% de bonnes réponses)
    const datasAnswer = score >= averageGrade ? (
        asked.map(datas => {
            // on créer un élément "parent" que l'on veut répéter plusieurs fois
            // pour cela, il faut créer un "key" (id)
            return (
                <tr key={datas.id}>
                    <td>{datas.id + 1}</td>
                    <td>{datas.question}</td>
                    <td>{datas.answer}</td>
                    <td>
                        <button
                            className="btnInfo"
                            onClick={ () => showModal(datas.heroId) }
                        >
                            Infos
                        </button>
                    </td>
                </tr>
            )
        })
    )
    :
    (
        <tr>
            <td colSpan="4">
                <Loader
                    loadingMsg={"Pas de réponses !"}
                    styling={{textAlign: 'center', color: 'red'}}
                />
            </td>
        </tr>
    )

    const resultInModal = !loading ?
    (
        <Fragment>
            <div className="modalHeader">
                <h2>{characterInfos.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <h3>Titre2</h3>
            </div>
            <div className="modalFooter">
                <button className="modalBtn">Fermer</button>
            </div>
        </Fragment>
    )
    :
    (
        <Fragment>
            <div className="modalHeader">
                <h2>Réponse du Shield ...</h2>
            </div>
            <div className="modalBody">
                <Loader />
            </div>
        </Fragment>

    )

    return (
        <Fragment>
            
            { decision }

            <hr />
            <p>Les réponses aux questions posées :</p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        { datasAnswer }
                    </tbody>
                </table>
            </div>

            <Modal showModal={openModal} closeModal={closeModal}>
                { resultInModal }
            </Modal>
        </Fragment>
    )
})
/* pour éviter de recharger les composants dont le state n'a pas été modifié
on utilise React.memo => (équivalent à pureComponent dans élément de type class)
ici nous sommes dans élémnet de type function on doit donc utiliser React.memo */
export default React.memo(QuizOver);