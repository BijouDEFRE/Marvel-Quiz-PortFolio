import React, { Component } from 'react';
import { QuizMarvel } from '../quizMarvel';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';

class Quiz extends Component {

    // on charge les tableaux contenus dans le composant quizMarvel
    // on renseigne les différents state qui nous interresse ex. affichage du bouton...
    state = {
        levelsNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        questionId: 0,
        btnDisabled: true,
        userAnswer: null
    }

    // on charge depuis le composant quizMarvel
    loadQuestions = quizz => {
        // console.log(level);
        // on cible le tableau que l'on veut afficher
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        // console.log(fetchedArrayQuiz);
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            // on créer un nouvel objet (tableau) pour cibler les éléments que l'on souhaite afficher
            const newArray = fetchedArrayQuiz.map( ({ answer, ...keepRest }) => keepRest);
            // mis à jour du state
            this.setState({
                storedQuestions: newArray
            })

        } else {
            console.log("Pas assez de questions !!!!");
        }
    }
    
    // on créer un tableau depuis le composant quizMarvel
    componentDidMount() {
        this.loadQuestions(this.state.levelsNames[this.state.quizLevel]);
    }

    // grace à la mise à jour du state nous avons accès à la méthode du cicle de vie :
    componentDidUpdate(prevProps, prevState) {
        // on peut vérifier si il y à une différence du state initiale
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            // console.log(this.state.storedQuestions[0].question);
            this.setState({
                question: this.state.storedQuestions[this.state.questionId].question,
                options: this.state.storedQuestions[this.state.questionId].options
            })
        }
    }

    // on créer une méthode pour prendre en compte le changement de state (onClick)
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }
    
    render() {

        /* je créer ma variable en dehors
        pour une meilleur lisibilité dans le JSX
        <h2>Pseudo: {this.props.userData.pseudo}</h2>
        cela s'appelle le déstructuring */
        // const { pseudo } = this.props.userData;
        // console.log(props.userData.pseudo);
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index}
                    // on créer une condition pour afficher ou non la class
                    // si la réponse est identique à celle obtenue dans le .map, on change la class
                    className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                    onClick={() => this.submitAnswer(option)}
                >
                    {option}
                </p>
            )
        })

        return (
            <div>
                {/* <h2>Pseudo: {pseudo}</h2> */}
                <Levels />
                <ProgressBar />
                <h2>{this.state.question}</h2>

                { displayOptions }

                <button disabled ={this.state.btnDisabled} className="btnSubmit">Suivant</button>
            </div>
        )
    }
}

export default Quiz;