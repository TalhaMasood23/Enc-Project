import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MonoalphabeticCipher = ({ inputText = "", cipherKey = "", actionType = "encrypt", onResult }) => {
  const [error, setError] = useState("");

  // Generate substitution map for encryption or decryption
  const generateSubstitutionMap = (cipherKey) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const sanitizedKey = cipherKey.toUpperCase().replace(/[^A-Z]/g, ""); // Remove non-alphabetic characters

    if (new Set(sanitizedKey).size !== sanitizedKey.length || sanitizedKey.length !== 26) {
      return null; // Invalid key
    }

    const substitutionMap = {};
    for (let i = 0; i < alphabet.length; i++) {
      if (actionType === "encrypt") {
        substitutionMap[alphabet[i]] = sanitizedKey[i]; // A -> Key[0], B -> Key[1], etc.
      } else {
        substitutionMap[sanitizedKey[i]] = alphabet[i]; // Reverse mapping for decryption
      }
    }
    return substitutionMap;
  };

  // Process the input text for encryption or decryption
  const processText = () => {
    if (!cipherKey || cipherKey.length !== 26) {
      setError("Key must be exactly 26 unique alphabetic characters.");
      onResult(""); // Clear output if key is invalid
      return;
    }

    const substitutionMap = generateSubstitutionMap(cipherKey);

    if (!substitutionMap) {
      setError("Invalid key. Please provide a valid 26-character unique substitution key.");
      onResult(""); // Clear output if substitution map fails
      return;
    }

    setError(""); // Clear previous errors

    const result = inputText
      .split("")
      .map((char) => {
        const upperChar = char.toUpperCase();
        return substitutionMap[upperChar] || char; // Substitute alphabetic characters or leave others unchanged
      })
      .join("");

    if (typeof onResult === "function") {
      onResult(result); // Pass the processed text back to the parent component
    } else {
      console.error("onResult is not a function");
    }
  };

  // Trigger processing when dependencies change
  useEffect(() => {
    processText();
  }, [inputText, cipherKey, actionType]);

  return (
    <div style={{ marginTop: "20px" }}>
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "10px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

// Default props
MonoalphabeticCipher.defaultProps = {
  onResult: () => {}, // No-op function if not provided
};

// Prop validation
MonoalphabeticCipher.propTypes = {
  inputText: PropTypes.string,
  cipherKey: PropTypes.string,
  actionType: PropTypes.oneOf(["encrypt", "decrypt"]),
  onResult: PropTypes.func.isRequired,
};

export default MonoalphabeticCipher;
