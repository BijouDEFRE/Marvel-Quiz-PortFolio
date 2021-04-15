import React from 'react';

/* grace à la props "children", on peur récupérer les éléments contenus dans le compsant
qui appelle "Modal" dans notre logique ici c'est QuizOver :
<Modal showModal={openModal}>
<div.......
ce sont tous les éléments contenus dans le composant appelé que l'on récupère ici */
const Modal = ({ showModal, children }) => {
    return (
        showModal && (
            <div className="modalBackground">
                <div className="modalContainer">
                    { children }
                </div>
            </div>
        )
    )
}

export default Modal;