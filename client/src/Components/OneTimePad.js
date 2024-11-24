import { useEffect } from "react";

const OneTimePad = ({ inputText, padKey, actionType, onResult }) => {
  const validateKey = (text, key) => {
    return (
      key &&
      key.length >= text.length &&
      /^[A-Za-z]+$/.test(key) // Ensure the pad key is alphabetic
    );
  };

  const sanitizeText = (text) =>
    text.toUpperCase().replace(/[^A-Z]/g, ""); // Remove non-alphabetic characters

  const encrypt = (text, key) => {
    return text
      .split("")
      .map((char, i) =>
        String.fromCharCode(((char.charCodeAt(0) - 65 + (key[i].charCodeAt(0) - 65)) % 26) + 65)
      )
      .join("");
  };

  const decrypt = (text, key) => {
    return text
      .split("")
      .map((char, i) =>
        String.fromCharCode(
          ((char.charCodeAt(0) - 65 - (key[i].charCodeAt(0) - 65) + 26) % 26) + 65
        )
      )
      .join("");
  };

  useEffect(() => {
    const sanitizedInput = sanitizeText(inputText);
    const sanitizedKey = sanitizeText(padKey);

    if (!validateKey(sanitizedInput, sanitizedKey)) {
      alert(
        "Invalid key! The key must be alphabetic and at least as long as the input text."
      );
      onResult("");
      
      return;
    }

    const output =
      actionType === "encrypt"
        ? encrypt(sanitizedInput, sanitizedKey)
        : decrypt(sanitizedInput, sanitizedKey);

    onResult(output);
  }, [inputText, padKey, actionType, onResult]);

  return null;
};

export default OneTimePad;
