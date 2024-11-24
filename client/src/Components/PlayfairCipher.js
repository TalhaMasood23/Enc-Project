import { useEffect } from "react";

const PlayfairCipher = ({ inputText, cipherKey, actionType, onResult }) => {
  const generateKeyMatrix = (key) => {
    const sanitizedKey = key
      .toUpperCase()
      .replace(/[^A-Z]/g, "") // Remove non-alphabetic characters
      .replace(/J/g, "I"); // Treat J as I
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    const uniqueKey = Array.from(new Set(sanitizedKey + alphabet)).join("");
    return Array.from({ length: 5 }, (_, i) =>
      uniqueKey.slice(i * 5, i * 5 + 5).split("")
    );
  };

  const prepareText = (text) => {
    const sanitizedText = text
      .toUpperCase()
      .replace(/[^A-Z]/g, "") // Remove non-alphabetic characters
      .replace(/J/g, "I"); // Treat J as I
    let preparedText = "";
    for (let i = 0; i < sanitizedText.length; i += 2) {
      const first = sanitizedText[i];
      const second = sanitizedText[i + 1] || "X"; // Add padding if odd length
      if (first === second) {
        preparedText += first + "X";
        i--; // Retry the next character
      } else {
        preparedText += first + second;
      }
    }
    return preparedText;
  };

  const processText = (text, matrix, action) => {
    const preparedText = prepareText(text);
    let result = "";
    for (let i = 0; i < preparedText.length; i += 2) {
      const char1 = preparedText[i];
      const char2 = preparedText[i + 1];
      result +=
        action === "encrypt"
          ? encryptPair(matrix, char1, char2)
          : decryptPair(matrix, char1, char2);
    }
    return result;
  };

  const encryptPair = (matrix, char1, char2) => {
    const [row1, col1] = findPosition(matrix, char1);
    const [row2, col2] = findPosition(matrix, char2);
    if (row1 === row2) {
      return matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
      return matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
    } else {
      return matrix[row1][col2] + matrix[row2][col1];
    }
  };

  const decryptPair = (matrix, char1, char2) => {
    const [row1, col1] = findPosition(matrix, char1);
    const [row2, col2] = findPosition(matrix, char2);
    if (row1 === row2) {
      return matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
    } else if (col1 === col2) {
      return matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2];
    } else {
      return matrix[row1][col2] + matrix[row2][col1];
    }
  };

  const findPosition = (matrix, char) => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === char) return [row, col];
      }
    }
    return null;
  };

  useEffect(() => {
    if (!cipherKey || cipherKey.trim() === "") {
      console.error("PlayfairCipher: Invalid or empty cipherKey provided."); // Debugging
      alert("Please provide a key for Playfair Cipher.");
      onResult(""); // Clear the output
      return;
    }

    const sanitizedKey = cipherKey.trim();
    const keyMatrix = generateKeyMatrix(sanitizedKey);
    const output = processText(inputText, keyMatrix, actionType);
    onResult(output);
  }, [inputText, cipherKey, actionType, onResult]);

  return null;
};

export default PlayfairCipher;
