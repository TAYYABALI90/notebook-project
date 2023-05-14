import './App.css';

import Navbar from './Components/Navbar';

import Home from './Components/Home';

import About from './Components/About';

import NoteState from './Context/notes/NoteState';

import Alert from './Components/Alert';

import Login from './Components/Login';

import Signup from './Components/Signup';

import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

function App() {

  let [alert, setAlert] = useState(null);

  let showAlert = (message, type) => {

    setAlert({

      message: message,

      type: type

    });

    setTimeout(() => {

      setAlert(null);

    }, 1500);

  };

  return (

    <>

      <NoteState>

        <Navbar></Navbar>

        <div className='my-5 py-2'>

          <Alert alert={alert}></Alert>

        </div>

        <div className="container my-5">

          <Routes>

            <Route exact path='/' element={<Home showAlert={showAlert}></Home>}></Route>

            <Route exact path='/about' element={<About></About>}></Route>

            <Route exact path='/login' element={<Login showAlert={showAlert}></Login>}></Route>

            <Route exact path='/signup' element={<Signup showAlert={showAlert}></Signup>}></Route>

          </Routes>

        </div>

      </NoteState>

    </>

  );

};

export default App;
