import React from 'react'

export default function Alert(props) {

    let capatalizeLetter = (word) => {

        if (word === "danger") {

            word = "error";

        };

        let lowerWord = word.toLowerCase();

        return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);

    };

    return (
        <div style={{height: "50px"}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capatalizeLetter(props.alert.type)}</strong> : {props.alert.message}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>
    )
}
