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
      <div className="w-full h-screen bg-[url('https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center">
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
            <div className="flex items-center justify-around gap-3 ">
              <div className="flex gap-1">
                <input
                  type="range"
                  id="rangeInput"
                  min="4"
                  max="30"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
                <label htmlFor="rangeInput">Password Length({length})</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  defaultChecked={numAllow}
                  onChange={() => setNumAllow((prev)=>!prev)}
                  id="numRadioBtn"
                />
                <label htmlFor="numRadioBtn">Numbers</label>
              </div>
              <div className="flex gap-1">
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
      </div>
    </>
  );
}

export default App;
