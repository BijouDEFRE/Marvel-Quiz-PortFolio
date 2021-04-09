import React, { useState, Fragment } from 'react';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = () => {

    const [userSession, setUserSession] = useState(null);

    // const display = userSession ? () : ()

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p>Loading...</p>
        </Fragment>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz />
            </div>
        </div>
    )
}

export default Welcome;