import React, { useEffect } from "react";

const VigenereCipher = ({ inputText = "", keyword = "", actionType = "encrypt", onResult }) => {
  const vigenereProcess = (text, keyword, mode) => {
    const keywordRepeats = keyword.repeat(Math.ceil(text.length / keyword.length)).slice(0, text.length);
    let result = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? "A".charCodeAt(0) : "a".charCodeAt(0);

        const charCode = char.charCodeAt(0) - base;
        const shift = (keywordRepeats[i].toLowerCase().charCodeAt(0) - "a".charCodeAt(0)) * (mode === "encrypt" ? 1 : -1);

        const newChar = String.fromCharCode(((charCode + shift + 26) % 26) + base);
        result += newChar;
      } else {
        result += char; // Non-alphabetic characters remain unchanged
      }
    }

    return result;
  };

  useEffect(() => {
    if (typeof onResult !== "function") {
      console.error("onResult callback is missing or not a function");
      return;
    }

    if (keyword.length === 0) {
      console.error("Keyword is empty or invalid");
      onResult("");
      return;
    }

    const processedText = vigenereProcess(inputText, keyword, actionType);
    onResult(processedText);
  }, [inputText, keyword, actionType, onResult]);

  return null; // No visual output needed
};

export default VigenereCipher;
