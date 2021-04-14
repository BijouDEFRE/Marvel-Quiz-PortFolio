import React, { useEffect, useState } from 'react';
import Stepper from 'react-stepper-horizontal';

// on importe nos "props" depuis notre composant "Quiz" en utilisant le destructuring
const Levels = ({levelNames, quizLevel}) => {

    // on créer notre variable d'état "useState"
    const [levels, setLevels] = useState([]);

    useEffect(() => {
        
        // on "map" sur le tableau reçu afin de cicler les champs désirés
        const quizSteps = levelNames.map(level => ({title: level.toUpperCase()}));
        setLevels(quizSteps);

    }, [levelNames]);

    return (
        <div className="levelsContainer">
            <Stepper
                steps={ levels }
                activeStep={ quizLevel }
            />
        </div>
    )
}

export default React.memo(Levels);