import React, { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';

class Quiz extends Component {

    render() {

        /* je créer ma variable en dehors
        pour une meilleur lisibilité dans le JSX
        <h2>Pseudo: {this.props.userData.pseudo}</h2>
        cela s'appelle le déstructuring */
        const { pseudo } = this.props.userData;
        // console.log(props.userData.pseudo);
        return (
            <div>
                {/* <h2>Pseudo: {pseudo}</h2> */}
                <Levels />
                <ProgressBar />
            </div>
        )
    }
}

export default Quiz;