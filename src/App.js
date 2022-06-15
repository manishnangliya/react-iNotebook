import './App.css';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';



const App = () => {
  //Alert message
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert(
      {
        message: message,
        type: type
      }
    )
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <div>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert}/>}  />
              <Route path="/signup" element={<Signup showAlert={showAlert} />}  />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
