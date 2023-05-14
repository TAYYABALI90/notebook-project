import React from 'react'

import Notes from './Notes';

export default function Home(props) {

    let {showAlert} = props;

    return (

        <>

            <Notes showAlert={showAlert}></Notes>

        </>

    );

};
