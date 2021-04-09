import React, { useRef, useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

    const [btn, setBtn] = useState(false);

    const refWolverine = useRef(null);

    // Affichage de la class "startingImg" qui affiche l'image avec les griffes
    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true)
        }, 2000);
    }, [])

    const setLeftImg = () => {
        // console.log('Je suis dans setLeftImg')
        refWolverine.current.classList.add("leftImg");
    }

    const setRightImg = () => {
        // console.log('Je suis dans setRightImg')
        refWolverine.current.classList.add("rightImg");
    }

    const clearImg = () => {
        if(refWolverine.current.classList.contains("leftImg")) {
            refWolverine.current.classList.remove("leftImg")
        } else if (refWolverine.current.classList.contains("rightImg")) {
            refWolverine.current.classList.remove("rightImg")
        }
    }

    // Affichage des boutons
    const displayBtn = btn && (
        <Fragment>
            <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
                <Link className="btn-welcome" to="/signup">Inscription</Link>
            </div>
            <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
                <Link className="btn-welcome" to="/login">Connexion</Link>
            </div>
        </Fragment>
    )

    return (
        <main ref={refWolverine} className="welcomePage">
            { displayBtn }
        </main>
    )
}

export default Landing;