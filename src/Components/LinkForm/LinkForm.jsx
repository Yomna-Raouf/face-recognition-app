import React from 'react';
import './LinkForm.css';

function LinkForm( {onInputChange, onButtonSubmit, link } ) {
    return (
        <div className="LinkForm">
            <p className="LinkForm__description">
                { 'This App will detect faces in your pictures. Give it a try' }
            </p>
            <div className="LinkForm__formContainer">
                <form className="LinkForm__form">
                    <input value={ link } placeholder="Your Image Link" className="LinkForm__formInput" type="text" onChange={ onInputChange } />
                    <button className="LinkForm__formButton" onClick={ onButtonSubmit } >Detect</button>
                </form>
            </div>
        </div>
    )
}

export default LinkForm
