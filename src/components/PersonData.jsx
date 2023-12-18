"use client";
import React, { useState, useEffect } from 'react';
import QRCodeScanner from './QRCodeScanner';
import "./per.css";
import {db,auth} from "../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
const PersonData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setpass] = useState('');
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [scanCount, setScanCount] = useState(0);
  const updateScanCount = (count) => {
    setScanCount(count);
  };
  useEffect(() => {
    
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedScanCount = localStorage.getItem('scanCount');
    console.log(storedScanCount);
    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail);
      setIsFirstTimeUser(false);
    }
  }, []); 
  
  const  handleFormSubmit = () => {
    console.log(pass);
    console.log(email);
    signInWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        setIsFirstTimeUser(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Login Failed, Try Again !!");
      });
  };
  const handleLogout = () =>{
    let auth = window.prompt('Type "CONFIRM" to confirm logout');
    if(auth=="CONFIRM")
    { localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('scanCount');
      localStorage.removeItem('scannedCodes');
      localStorage.removeItem('scanCount');
      setName('');
      setEmail('');
      updateScanCount(0);
      setIsFirstTimeUser(true);
    }
    else 
    {
      window.alert("Try again");
    }
  };
  
  return (
    <div >
      {isFirstTimeUser ? (<div className='w-screen h-screen bg-gray-200 flex justify-center items-center '>
        <form onSubmit={handleFormSubmit} className='p-4 bg-white flex flex-col items-center shadow-md rounded-md font-sans'>
          <h1 className='font-serif'>PROTEK - 2023</h1>
          <label className='label mt-2'>
            Team Name:
            <input className='input' placeholder='Username' type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          </label>
          <label className='label'>
            Email:
            <input className='input' placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </label>
          <label className='label'>
            Password:
            <input className='input' placeholder='password' type="password" value={pass} onChange={(e) => setpass(e.target.value)} required/>
          </label>
          <button className='p-2 bg-red-900 mt-3 font-semibold text-white rounded-lg mt-2' type="submit">LOGIN</button>
        </form>
        </div>
      ) : (
        <div className='w-screen h-screen bg-gray-200'>
          <div className=' flex justify-start'>
        <p className='font-serif text-2xl mb-1 mt-2 ml-5'>Welcome  {name}</p>
        </div>
        <div className=' flex justify-end'>
        <button onClick={handleLogout} className='p-2 bg-red-900 text-white rounded-lg mt-1 mr-2'>Logout</button>
        </div>
        <div className=' flex justify-center'>
        <p  className='font-serif text-1xl mb-0 blink'>Total No of Scan: {scanCount}</p>
        </div>
        <hr className='pt-0.5 bg-red-900 mt-3 ml-3 mr-3' />
        <h1 className='flex justify-center font-serif text-2xl mt-4 mb-4'>Scan QR</h1>
        <QRCodeScanner updateScanCount={updateScanCount} email={email} />
      </div>
      )}
    </div>
  );
};

export default PersonData;
