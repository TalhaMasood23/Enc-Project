
import React from 'react';
import Form from './Pages/mainForm';
import CaesarCipher from "./Components/Cesar";
import VigenereCipher from "./Components/Vigenere";
import MonoalphabeticCipher from "./Components/Monoalphabetic";



const App = () => {
  return (
    <div className="App">
      <Form />
      <CaesarCipher />
      <VigenereCipher />
      <MonoalphabeticCipher />



    </div>
  );
};

export default App;
