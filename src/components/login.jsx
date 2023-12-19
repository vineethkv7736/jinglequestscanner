import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    console.log(pass);
    console.log(email);
    if (name === "" || email === "" || pass === "") {
      alert("Some fields are missing");
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(async () => {
          const user = {
            userName: name,
            email: email,
          };
          console.log(user);

          localStorage.setItem("user", JSON.stringify(user));
          navigate("/scan");
          //   setIsFirstTimeUser(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          alert("Login Failed, Try Again !!");
        });
    }
  };
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center ">
      <div className="p-4 bg-white flex flex-col items-center shadow-md rounded-md font-sans">
        <h1 className="font-serif">Jingle Quest</h1>
        <label className="label mt-2">
          Team Name:
          <input
            className="input"
            placeholder="Username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Email:
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Password:
          <input
            className="input"
            placeholder="password"
            type="password"
            value={pass}
            onChange={(e) => setpass(e.target.value)}
            required
          />
        </label>
        <button
          className="p-2 bg-red-900 mt-3 font-semibold text-white rounded-lg mt-2"
          onClick={handleFormSubmit}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
