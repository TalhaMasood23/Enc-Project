import React, { useEffect } from "react";

const CaesarCipher = ({ inputText = "", keyValue = 0, actionType = "encrypt", onResult }) => {
  const shiftChar = (char, shiftValue) => {
    const isUpperCase = char >= "A" && char <= "Z";
    const isLowerCase = char >= "a" && char <= "z";

    if (isUpperCase) {
      const base = "A".charCodeAt(0);
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + shiftValue + 26) % 26) + base
      );
    }

    if (isLowerCase) {
      const base = "a".charCodeAt(0);
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + shiftValue + 26) % 26) + base
      );
    }

    return char; // Non-alphabetic characters are not shifted
  };

  const processText = () => {
    if (!onResult) {
      console.error("onResult callback is missing");
      return;
    }

    const shiftValue = actionType === "encrypt" ? keyValue : -keyValue;
    const result = inputText
      .split("")
      .map((char) => shiftChar(char, shiftValue))
      .join("");

    onResult(result); // Send the result back to MainForm
  };

  useEffect(() => {
    processText();
  }, [inputText, keyValue, actionType]);

  return null; // No visual render needed
};

export default CaesarCipher;
