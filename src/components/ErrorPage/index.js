// Functionals import
import React from 'react';
// Components import
import notFound from "../../assets/images/404.png";
// Esthetics import
import './errorPage.css';

const centerImg = {
    display: "bloc",
    margin: "-25px auto"
}

const ErrorPage = () => {
    return (
        <div className="errorQuiz-bg">
            <div className="errorContainer">
                {/* <h2 style={centerh2}>Oups, cette page n'existe pas !</h2> */}
                <img src={notFound} alt="error page" />
            </div>
            
        </div>
    )
}

export default ErrorPage;