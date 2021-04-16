// Functionals import
import React, { useEffect, useState } from 'react';
// Esthetics import
import Stepper from 'react-stepper-horizontal';
import './levels.css';

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
        <div className="levelsContainer" style={{background: 'transparent'}}>
            {/* https://www.npmjs.com/package/react-stepper-horizontal */}
            <Stepper
                steps={ levels }
                activeStep={ quizLevel }
                circleTop={0}
                activeTitleColor={'#d31017'}
                activeColor={'#d31017'}
                completeTitleColor={'#E0E0E0'}
                defaultTitleColor={'#E0E0E0'}
                completeColor={'#E0E0E0'}
                completeBarColor={'#E0E0E0'}
                barStyle={'dashed'}
                size={45}
                circleFontSize={24}
            />
        </div>
    )
}

export default React.memo(Levels);