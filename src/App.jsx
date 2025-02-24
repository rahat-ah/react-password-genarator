import {useEffect,useCallback, useState,useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const inputRef = useRef(null);


  const generatePassword = useCallback(() => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChar = "!@#$%^&*=+<>/?";
    const numbers = "0123456789";
    
    let str = characters;
    let result = "";
    if (numAllow) str += numbers;
    if (charAllow) str += specialChar;
    
    for (let i = 0; i < length; i++) {
      result += str.charAt(Math.floor(Math.random() * str.length) + 1);
    }
    setPassword(result);
  }, [length, numAllow, charAllow]);

  
  useEffect(() => {
    generatePassword();
  },[length,numAllow,charAllow]);

  const copyToClip = () => {
    window.navigator.clipboard.writeText(inputRef.current.value);
    inputRef.current.select();
  };
  
  return (
    <>
      <div className="w-full h-screen bg-gray-900 flex flex-col justify-center items-center">
        <h1 className="capitalize text-white text-4xl">password generator</h1>
        <div className="w-full max-w-xl h-[200px] mt-9 rounded-xl bg-gray-600 flex flex-col justify-center gap-5 items-center">
          <div className="w-full flex align-center justify-center">
            <input
              type="text"
              className="bg-white text-green-700 font-semibold rounded-l-2xl pl-3 border outline-none focus:ring-0 focus:border-transparent w-[400px]"
              readOnly
              value={password}
              ref={inputRef}
            />
            <button className="bg-blue-600 rounded-r-2xl px-4 py-3 text-white capitalize text-lg hover:bg-blue-900 font-bold" onClick={copyToClip}>
              copy
            </button>
          </div>
          <div className="text-yellow-300 flex justify-center w-full">
            <div className="flex align-center justify-around">
              <input
                type="range"
                id="rangeInput"
                min="4"
                max="30"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="rangeInput">Password Length({length})</label>
              <input
                type="checkbox"
                defaultChecked={numAllow}
                onChange={() => setNumAllow((prev)=>!prev)}
                id="numRadioBtn"
              />
              <label htmlFor="numRadioBtn">Numbers</label>
              <input 
                type="checkbox"
                id="specialCharRadioBtn"
                defaultChecked={charAllow}
                onChange={() => setCharAllow((prev)=>!prev)} 
              />
              <label htmlFor="specialCharRadioBtn">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
