import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, Setlength] = useState(8);
  const [Number, setNumber] = useState(false);
  const [Char, setChar] = useState(false);
  const [Password, setPassword] = useState("");
  const [CopyMessage, setCopyMessage] = useState("");

  //use Ref
  const PasswordRef = useRef(null);
  const PasswordGeneretor = useCallback(() => {
    let pass = "";
    let str = "ABCDFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (Number) str += "0123456789";
    if (Char) str += "!@#$%^&*()-_+={}[]~`";
    for (let i = 0; i <= length; i++) {
      let charac = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charac);
    }
    setPassword(pass);
  }, [length, Number, Char, setPassword]);

  const CopytoClip = useCallback(() => {
    PasswordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
    setCopyMessage("Copied to clipboard!");

    // Reset copy message after 3 seconds
    setTimeout(() => {
      setCopyMessage("");
    }, 1000);
  }, [Password]);

  useEffect(() => {
    PasswordGeneretor();
  }, [length, Number, Char, PasswordGeneretor]);

  return (
    <>
      <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-8 py-8 my-52 bg-slate-800 text-orange-500">
        <h1 className="text-white text-center my-1">Password Generator</h1>
        {CopyMessage && (
          <p className="text-green-300 text-right ">{CopyMessage}</p>
        )}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={PasswordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={CopytoClip}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                Setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={Number}
              id="numinput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numinput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={Char}
              id="charinput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charinput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
