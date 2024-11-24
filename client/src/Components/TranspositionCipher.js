import React from "react";

const TranspositionCipher = ({ inputText, actionType, onResult }) => {
  const encrypt = (text) => {
    // Transposition encryption logic
    // Example: Simple columnar transposition
    let rows = Math.ceil(text.length / 5);
    let result = "";
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < rows; row++) {
        let charIndex = row * 5 + col;
        result += text[charIndex] || " ";
      }
    }
    return result.trim();
  };

  const decrypt = (text) => {
    // Transposition decryption logic
    // Example: Reverse columnar transposition
    let rows = Math.ceil(text.length / 5);
    let cols = 5;
    let result = new Array(rows).fill("").map(() => Array(cols).fill(" "));
    let index = 0;
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        if (index < text.length) {
          result[row][col] = text[index];
          index++;
        }
      }
    }
    return result.flat().join("").trim();
  };

  const output = actionType === "encrypt" ? encrypt(inputText) : decrypt(inputText);

  React.useEffect(() => {
    onResult(output);
  }, [output, onResult]);

  return null;
};

export default TranspositionCipher;
