import './App.css'
import Login from './components/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scan from './components/scan'
//import QRCodeScanner from './components/QRCodeScanner'

function App() {

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
