import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { db } from "../firebase/config.js";
import { doc, updateDoc } from "firebase/firestore";

const QRCodeScanner = (email) => {
  const [scanCount, setScanCount] = useState(0);
  const [test, testCount] = useState(0);
 
  useEffect(()=>{
    const storedScanCount = localStorage.getItem("scanCount");
    if(storedScanCount!==null){
      setScanCount(storedScanCount);
    }
    testCount(prev=>prev+1);
  },[])

  const upcount = async (email) => {
    const up = doc(db, "users", email);
    await updateDoc(up, {
      qr: true,
    })
      .then(() => {
        console.log("Successful");
      })
      .catch((error) => {
        alert("Firebase error. Try again");
        console.error(error);
      });
    alert("Game ended");
  };

  useEffect(() => {
    //  const storedScanCount = localStorage.getItem("scanCount");
    //  if (storedScanCount !== null) {
    //    setScanCount(storedScanCount);
    //  }
    // const storedScanCount = localStorage.getItem("scanCount");
    // if (test === 9) {
    //   upcount(email);
    // }
    // if (storedScanCount) {
    //   updateScanCount(parseInt(storedScanCount, 10));
    // }

    const qrCodeScanner = new Html5QrcodeScanner("reader", {
      fps: 500,
      qrbox: 150,
    });

    // qrCodeScannerRef.current = qrCodeScanner;

    qrCodeScanner.render(success, error);

    // return () => {
    //   if (qrCodeScannerRef.current) {
    //     qrCodeScannerRef.current.clear();
    //   }
    // };

    function success(result) {

      const l = result.length;
      result = result.toLowerCase();

      if (result.charAt(l - 1) === " " && result.substring(0, 3) === "prc") {

        const scannedCodes =
          JSON.parse(localStorage.getItem("scannedCodes")) || [];

        if (scannedCodes.includes(result)) {
           qrCodeScanner.clear();
          testCount((prevCount) => prevCount + 1);
          window.alert(`This QR code has already been scanned.`);
        } else {
          testCount((prevCount) => prevCount + 1);
          localStorage.setItem(
            "scannedCodes",
            JSON.stringify([...scannedCodes, result])
            );
             qrCodeScanner.clear();
             if (scanCount === 3) {
               upcount(email);
             }
          setScanCount(prev=>prev+1);
        }
      } else {qrCodeScanner.clear();
         testCount((prevCount) => prevCount + 1);
        window.alert(`This QR is not authorized in our system`);
      }
      qrCodeScanner.clear();
    }
    
    function error() {}
  }, [test]);
  
  useEffect(() => {
    // if (test > 0) {
      localStorage.setItem("scanCount", scanCount);
      console.log("Scancount:", scanCount);
      // updateScanCount(scanCount);
    // }
  }, [scanCount]);

  return (
    <div>
      <div
        id="reader"
        className="p-4 ml-10 mr-10 bg-white flex flex-col justify-center shadow-md rounded-md font-sans"
      ></div>
    </div>
  );
};

export default QRCodeScanner;
