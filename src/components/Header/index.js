import React from 'react';
import Marvel from '../../images/MARVEL-QUIZ-3.svg';

const Header = () => {
    return (
        <header>
            <div to="/" className="banner-container">
                <a href="/"><img src={Marvel} alt=""/></a>
                {/* <h1><a href="/">Marvel Quiz</a></h1> */}
            </div>
        </header>
    )
}

export default Header;