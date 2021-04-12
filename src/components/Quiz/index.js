import React, { Component, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuizMarvel } from '../quizMarvel';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';

toast.configure();

class Quiz extends Component {

    // on charge les tableaux contenus dans le composant quizMarvel
    // on renseigne les différents state qui nous interresse ex. affichage du bouton...
    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        questionId: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showWelcomeMsg: false,
        quizEnd: false
    }

    /* on récupère les bonnes réponses obtenues par la variable :
    const newArray = fetchedArrayQuiz.map( ({ answer, ...keepRest }) => keepRest)
    cette fois on utilise pas le destructuring, on récupère tout */
    storedDataRef = React.createRef();

    // gestion de l'affichage du toaster user
    showWelcomeMsg = pseudo => {
        if(!this.state.showWelcomeMsg) {

            this.setState({
                showWelcomeMsg: true
            })

            toast.info(`Bienvenue \ ${pseudo} !`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                allowHtml: true,
                useCss: true,
                bodyClassName: "toastify-color-welcome",
            });
        }
    }
    
    // on charge depuis le composant quizMarvel
    loadQuestions = quizz => {
        // console.log(level);
        // on cible le tableau que l'on veut afficher
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        // console.log(fetchedArrayQuiz);
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            
            /* on récupère les bonnes réponses obtenues par la variable :
            const newArray = fetchedArrayQuiz.map( ({ answer, ...keepRest }) => keepRest)
            cette fois on utilise pas le destructuring, on récupère tout */
            this.storedDataRef.current = fetchedArrayQuiz;
            // console.log(this.storedDataRef.current)

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
        this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
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
        
        // si le state actuel est différent du prevState, alors on passe à la question suivante
        if (this.state.questionId !== prevState.questionId) {
            this.setState({
                question: this.state.storedQuestions[this.state.questionId].question,
                options: this.state.storedQuestions[this.state.questionId].options,
                // le state est modifié donc on réinitialise
                userAnswer: null,
                btnDisabled: true
            })
        }

        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo)
        }
    }

    // on créer une méthode pour prendre en compte le changement de state (onClick)
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    // on créer une méthode pour terminer la "page" quand on à fini les 10 questions
    gameOver = () => {

        const gradePercent = this.getPercentage(this.state.maxQuestions, this.score);
        if (gradePercent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: gradePercent,
                quizEnd: true
            })
        } else {
            this.setState({
                percent: gradePercent,
                quizEnd: true
            })
        }
    }

    nextQuestion= () => {
        if (this.state.questionId === this.state.maxQuestions -1) {
            // console.log("Game Over");
            this.gameOver();
        } else {
            this.setState(prevState => ({
                questionId: prevState.questionId +1
            }))
        }

        // ici on cible la réponse du User de la questionId et la réponse attendue
        const goodAnswer = this.storedDataRef.current[this.state.questionId].answer;
        if (this.state.userAnswer === goodAnswer) {
            this.setState( prevState => ({
                /* si la réponse du User = réponse attendue (prevState)
                on incrémente le score + 1, comme on modifie la data de notre state
                nous pouvons réactivé la méthode componentDidUpdate */
                score: prevState.score + 1
            }))

            toast.success('Bravo + 1', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyClassName: "toastify-success",
            });
        } else {
            toast.error('Dommage 0', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyClassName: "toastify-error",
            });
        }
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

        // gestion de la fin du quiz on passe tout le return dans le nouveau state
        return this.state.quizEnd ? (
            <QuizOver
            // ici on passe un "props" afin de le récupérer depuis notre composant (QuizOver)
                ref={this.storedDataRef}
                props="Je suis une props ordinaire"
                levelsNames={this.state.levelNames}
                score={this.state.score}
                maxQuestions={this.state.maxQuestions}
                quizLevel={this.state.quizLevel}
                percent={this.state.percent}
            />
        )
        : 
        (
            <Fragment>
                {/* <h2>Pseudo: {pseudo}</h2> */}
                <Levels />

                <ProgressBar
                    questionId={this.state.questionId}
                    maxQuestions={this.state.maxQuestions}
                />
                <h2>{this.state.question}</h2>

                { displayOptions }

                <button
                    disabled ={this.state.btnDisabled}
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                >
                    {/* gestion de l'affichage du bouton selon le state */}
                    { this.state.questionId < this.state.maxQuestions -1 ? "Suivant" : "Terminer" }
                </button>
            </Fragment>
        )
    }
}

export default Quiz;