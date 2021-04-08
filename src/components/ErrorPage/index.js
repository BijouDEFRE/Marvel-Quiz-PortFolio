import React from 'react';
import notFound from "../../images/404.png";

// const centerh2 = {
//     textAlign: "center",
//     marginTop: "50px"
// }

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