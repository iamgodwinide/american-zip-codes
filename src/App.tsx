import React, { FormEvent, useState } from 'react';
import './App.css';

function App() {
  const [errorMsg, setErrorMsg] = useState('');
  const [zipcode, setZipcode] = useState('');

  const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

  const validate = (text: string): void => {
    // validation
    if (!regex.test(text)) {
      setErrorMsg("invalid zip code, must either be 5 or 9 chars.")
    } else {
      setErrorMsg("");
    }
  }

  const handleInput = (evt: React.FormEvent<HTMLInputElement>): void => {
    const inputText = evt.currentTarget.value

    if (zipcode.length > 4 && inputText.length > zipcode.length) {
      const code: string = inputText.replace(/-/g, "");
      const formattedCode: string = String(code.slice(0, 5) + "-" + code.slice(5));
      setZipcode(() => formattedCode);
      validate(formattedCode);
    } else {
      setZipcode(() => inputText);
      validate(inputText);
    }

  }

  return (
    <div className="App">
      <form className='form'>
        <h1 className='title'>Ergeon</h1>
        <input
          className={errorMsg.length != 0 ? "error" : "success"}
          id="zipcode" type={"text"}
          placeholder="Enter postal/zip code"
          onChange={(evt: React.FormEvent<HTMLInputElement>) => handleInput(evt)}
          value={zipcode}
        />
        <small className='warning-text'>
          {errorMsg.length != 0 && errorMsg}
        </small>
      </form>
    </div>
  );
}

export default App;
