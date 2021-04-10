import React from 'react';

const Quiz = (props) => {
    // console.log(props.userData.pseudo);
    return (
        <div>
            <h2>Pseudo: {props.userData.pseudo}</h2>
        </div>
    )
}

export default Quiz;