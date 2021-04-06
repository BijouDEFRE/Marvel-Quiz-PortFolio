import React from 'react';
import title from '../../images/MARVEL-QUIZ-3.svg';

const Header = () => {
    return (
        <header>
            <div className="banner-container">
                <img src={title} alt="MARVEL API-QUIZ" />
                {/* <h1><a href="/">Marvel Quiz</a></h1> */}
            </div>
        </header>
    )
}

export default Header;