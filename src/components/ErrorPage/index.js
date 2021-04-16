// Functionals import
import React from 'react';
// Components import
import notFound from "../../assets/images/404@254x.png";
// Esthetics import
import './errorPage.css';

const centerImg = {
    display: "bloc",
    margin: "-25px auto"
}

const ErrorPage = () => {
    return (
        <div className="quiz-bg">
            <div className="container">
                {/* <h2 style={centerh2}>Oups, cette page n'existe pas !</h2> */}
                <img style={centerImg} src={notFound} alt="error page" />
            </div>
            
        </div>
    )
}

export default ErrorPage;