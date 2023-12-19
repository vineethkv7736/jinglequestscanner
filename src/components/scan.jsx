import { useEffect, useState } from "react";
import QRCodeScanner from "./QRCodeScanner";
import { useNavigate } from "react-router-dom";

const Scan = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scanCount, setScanCount] = useState(0);

  const updateScanCount = () => {
    setScanCount((prev)=>prev+1);
  };

  const handleLogout = () => {
    let auth = window.prompt('Type "CONFIRM" to confirm logout');
    if (auth == "CONFIRM") {
      localStorage.removeItem("user");
      localStorage.removeItem("scanCount");
      localStorage.removeItem("scannedCodes");
      navigate("/");
      //   localStorage.removeItem("scanCount");
      //  setName("");
      //  setEmail("");
      //  updateScanCount(0);
      //  setIsFirstTimeUser(true);
    } else {
      window.alert("Try again");
    }
  };
  useEffect(() => {
    const storedNameJson = localStorage.getItem("user");
    const storedUser = JSON.parse(storedNameJson);
    const storedScanCount = localStorage.getItem("scanCount");
    console.log(storedScanCount);
    if (storedUser) {
      setName(storedUser.userName);
      setEmail(storedUser.email);
      if (storedScanCount !== null) {
        setScanCount(storedScanCount);
      }
      //   setIsFirstTimeUser(false);
    }
    console.log(storedScanCount, scanCount);
  }, []);
  return (
    <div>
      <div className="w-screen h-screen bg-gray-200">
        <div className=" flex justify-start">
          <p className="font-serif text-2xl mb-1 mt-2 ml-5">
            Welcome guys {name}
          </p>
        </div>
        <div className=" flex justify-end">
          <button
            onClick={handleLogout}
            className="p-2 bg-red-900 text-white rounded-lg mt-1 mr-2"
          >
            Logout
          </button>
        </div>
        <div className=" flex justify-center">
          <p className="font-serif text-1xl mb-0 blink">
            Total No of Scan: {scanCount}
          </p>
        </div>
        <hr className="pt-0.5 bg-red-900 mt-3 ml-3 mr-3" />
        <h1 className="flex justify-center font-serif text-2xl mt-4 mb-4">
          Scan QR
        </h1>
        <QRCodeScanner email={email} updateScanCount={updateScanCount} />
      </div>
    </div>
  );
};

export default Scan;
