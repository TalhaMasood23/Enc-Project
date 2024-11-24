import React from "react";

const AffineCipher = ({ inputText, actionType, a = 5, b = 8, onResult }) => {
  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return -1;
  };

  const encrypt = (text) => {
    return text
      .toUpperCase()
      .replace(/[A-Z]/g, (char) =>
        String.fromCharCode(((a * (char.charCodeAt(0) - 65) + b) % 26) + 65)
      );
  };

  const decrypt = (text) => {
    const aInv = modInverse(a, 26);
    return text
      .toUpperCase()
      .replace(/[A-Z]/g, (char) =>
        String.fromCharCode(
          ((aInv * ((char.charCodeAt(0) - 65 - b + 26)) % 26) + 26) % 26 + 65
        )
      );
  };

  const output = actionType === "encrypt" ? encrypt(inputText) : decrypt(inputText);

  React.useEffect(() => {
    onResult(output);
  }, [output, onResult]);

  return null;
};

export default AffineCipher;
