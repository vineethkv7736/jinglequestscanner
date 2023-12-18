import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = ({ onScan, updateScanCount }) => {
  const [scanCount, setScanCount] = useState(0);
  const [test, testCount] = useState(0);
  useEffect(() => {
    const storedScanCount = localStorage.getItem('scanCount');
    console.log(">>",storedScanCount);
    if (storedScanCount) {
      updateScanCount(parseInt(storedScanCount, 10));
    }

    const qrCodeScanner = new Html5QrcodeScanner('reader', {
      fps: 500,
      qrbox:150,
    });

    qrCodeScanner.render(success, error);

    function success(result) {
      console.log(result);
      const l = result.length;
      result = result.toLowerCase();
      if (result.charAt(l - 1) === ' ' && result.substring(0, 3) === 'prc')
       {
        const scannedCodes = JSON.parse(localStorage.getItem('scannedCodes')) || [];
        if (scannedCodes.includes(result)) { qrCodeScanner.clear();
          testCount((prevCount) => prevCount + 1);
          window.alert(`This QR code has already been scanned.`);
         
        } 
        else {  qrCodeScanner.clear();
          testCount((prevCount) => prevCount + 1);
          localStorage.setItem('scannedCodes', JSON.stringify([...scannedCodes, result]));
          setScanCount(scanCount+1);
          console.log("Scancount:",scanCount);
        }
      }
      else {
        qrCodeScanner.clear();
        testCount((prevCount) => prevCount + 1);
        window.alert(`This QR is not authorized our system`);
      }
      
    }
    
    function error(error) {
      
    }
    
    // updateScanCount(scanCount);
  },[test]);

  useEffect(()=>{
    if(test>0){
      localStorage.setItem("scanCount", scanCount);
      const storedScan = localStorage.getItem('scanCount');
      console.log("<><><>",storedScan,scanCount);
      updateScanCount(scanCount);
    }
    
  },[scanCount])

  return (
    <div>
      <div id="reader" className='p-4 ml-10 mr-10 bg-white flex flex-col justify-center shadow-md rounded-md font-sans'></div>
    </div>
  );
};

export default QRCodeScanner;
