import React from 'react';
import './LinkForm.css';

function LinkForm() {
    return (
        <div className="LinkForm">
            <p className="LinkForm__description">
                { 'This App will detect faces in your pictures. Give it a try' }
            </p>
            <div className="LinkForm__formContainer">
                <form className="LinkForm__form">
                    <input placeholder="Your Image Link" className="LinkForm__formInput" type="text" />
                    <button className="LinkForm__formButton">Detect</button>
                </form>
            </div>
        </div>
    )
}

export default LinkForm
