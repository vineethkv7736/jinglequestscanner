import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PersonData from './components/PersonData'
import Login from './components/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scan from './components/scan'
//import QRCodeScanner from './components/QRCodeScanner'
function App() {
  const [count, setCount] = useState(0)

  const [showScanner, setShowScanner] = useState(false);

  const openScanner = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route path="/scan" element={<Scan />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App
