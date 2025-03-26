import React, { useState } from "react";
import "../StyleSheet/mainFrom.css";
import CaesarCipher from "../Components/Cesar";
import VigenereCipher from "../Components/Vigenere";
import MonoalphabeticCipher from "../Components/Monoalphabetic";
import AffineCipher from "../Components/AffineCipher";
import OneTimePad from "../Components/OneTimePad";
import PlayfairCipher from "../Components/PlayfairCipher";
import TranspositionCipher from "../Components/TranspositionCipher";

import Table from "../Asserts/table.png";
import Modal1 from "../Components/Modal1";
import Modal2 from "../Components/Modal2";

const MainForm = () => {
  const [formData, setFormData] = useState({
    inputText: "",
    outputText: "",
    technique: "",
    keyword: "",
    monoKey: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Controls whether the modal is visible
  const [activeModal, setActiveModal] = useState(""); // Tracks which modal is active

  const [showImage, setShowImage] = useState(false); // For Vigenere Table modal

  const openModal = (modalType) => {
    setActiveModal(modalType); // Set the modal type (e.g., 'encrypt' or 'decrypt')
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setActiveModal(""); // Reset the modal type
  };

  const [key, setKey] = useState(3); // Default key value for Caesar
  const [actionType, setActionType] = useState("");

  const infoText = {
    caesar: {
      description:
        "Caesar Cipher: A substitution cipher that shifts characters by a fixed number of positions in the alphabet.",
      instructions:
        "Enter the text in the input field, select a shift value (key), and press 'Encrypt' to get the ciphertext. Use the same key for decryption.",
    },
    vigenere: {
      description:
        "Vigenere Cipher: A polyalphabetic cipher that uses a keyword to encrypt messages by shifting characters.",
      instructions:
        "Enter the text in the input field, provide a keyword, and press 'Encrypt'. For decryption, use the same keyword.",
    },
    monoalphabetic: {
      description:
        "Monoalphabetic Cipher: A substitution cipher that replaces each letter with another letter based on a fixed key.",
      instructions:
        "Enter the text in the input field, provide a 26-character unique alphabetic key, and press 'Encrypt'. Use the same key for decryption.",
    },
    transposition: {
      description:
        "Transposition Cipher: Rearranges the letters in the plaintext according to a predefined pattern.",
      instructions:
        "Enter the text in the input field and press 'Encrypt'. Decryption reverses the rearrangement pattern.",
    },
    affine: {
      description:
        "Affine Cipher: Combines multiplication and addition modulo 26 to encrypt letters.",
      instructions:
        "Enter the text in the input field, provide coefficients 'a' and 'b' for the affine function (ax + b mod 26), and press 'Encrypt'. Use the same coefficients for decryption.",
    },
    onetimepad: {
      description:
        "One-Time Pad: A cipher that uses a randomly generated key of the same length as the plaintext.",
      instructions:
        "Enter the text in the input field, provide a key of the same length, and press 'Encrypt'. Use the same key for decryption.",
    },
    playfair: {
      description:
        "Playfair Cipher: A digraph substitution cipher that uses a 5x5 grid generated from a keyword.",
      instructions:
        "Enter the text in the input field, provide a keyword, and press 'Encrypt'. Decryption requires the same keyword.",
    },
  };

  const handleReset = () => {
    setFormData({
      inputText: "",
      outputText: "",
      technique: "",
      keyword: "",
      monoKey: "",
    });
    setKey(3); // Reset Caesar Cipher key to default
    setActionType(""); // Reset the action type
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyChange = (e) => {
    setKey(Number(e.target.value));
  };

  const handleEncrypt = () => {
    if (formData.technique) {
      setActionType("encrypt");
      openModal();
    } else {
      alert("Please select a valid cipher technique.");
    }
  };

  const handleDecrypt = () => {
    if (formData.technique) {
      setActionType("decrypt");
      openModal();
    } else {
      alert("Please select a valid cipher technique.");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Information Security Project</h2>
      <form className="form">
        {/* Input and Output Field */}
        <label className="label">Enter your text</label>
        <textarea
          name="inputText"
          value={formData.inputText}
          onChange={handleChange}
          rows="3"
          style={{
            width: "95%",
            marginTop: "10px",
            padding: "10px",
            fontSize: "14px",
          }}
        />
        <br />
        <label className="label">Output Text</label>
        <textarea
          name="outputText"
          value={formData.outputText}
          readOnly
          rows="3"
          style={{
            width: "95%",
            marginTop: "10px",
            padding: "10px",
            fontSize: "14px",
            backgroundColor: "#f0f0f0",
          }}
        />
        <br />

        {/* Technique Selection */}
        <label className="label">Choose Technique</label>
        <select
          name="technique"
          value={formData.technique}
          onChange={(e) =>
            setFormData({ ...formData, technique: e.target.value })
          }
          className="input"
          required
          style={{ background: "black", color: "white", marginTop: "10px", width:"40%" }}
        >
          <option value="">Select a technique</option>
          <option value="caesar">Caesar Cipher</option>
          <option value="vigenere">Vigenere Cipher</option>
          <option value="monoalphabetic">Monoalphabetic Cipher</option>
          <option value="transposition">Transposition Cipher</option>
          <option value="affine">Affine Cipher</option>
          <option value="onetimepad">One-Time Pad</option>
          <option value="playfair">Playfair Cipher</option>
        </select>
        <br />

        {/* Dynamic Key Inputs */}
        {formData.technique === "caesar" && (
          <div>
            <label className="label">
              Key (Shift Value):
              <input
                type="number"
                value={key}
                onChange={handleKeyChange}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "60px",
                }}
              />
            </label>
          </div>
        )}

        {formData.technique === "vigenere" && (
          <div>
            <label className="label">
              Keyword:
              <input
                type="text"
                name="keyword"
                value={formData.keyword || ""}
                onChange={(e) =>
                  setFormData({ ...formData, keyword: e.target.value })
                }
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "150px",
                }}
              />
            </label>
          </div>
        )}

        {formData.technique === "monoalphabetic" && (
          <div>
            <label className="label">
              Monoalphabetic Key:
              <input
                type="text"
                name="monoKey"
                value={formData.monoKey || ""}
                onChange={(e) => {
                  const sanitizedKey = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z]/g, "");
                  if (
                    new Set(sanitizedKey).size === sanitizedKey.length &&
                    sanitizedKey.length === 26
                  ) {
                    setFormData({ ...formData, monoKey: sanitizedKey });
                  } else {
                    alert(
                      "Invalid key. Please enter a valid 26-character unique alphabetic key."
                    );
                  }
                }}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "300px",
                }}
              />
            </label>
          </div>
        )}

        {formData.technique === "onetimepad" && (
          <div>
            <label className="label">
              Pad Key:
              <input
                type="text"
                name="keyword"
                value={formData.keyword || ""}
                onChange={(e) =>
                  setFormData({ ...formData, keyword: e.target.value })
                }
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "200px",
                }}
              />
            </label>
          </div>
        )}

        {formData.technique === "playfair" && (
          <div>
            <label className="label">
              Playfair Key:
              <input
                type="text"
                name="keyword"
                value={formData.keyword || ""}
                onChange={
                  (e) => setFormData({ ...formData, keyword: e.target.value }) // Ensure keyword updates in formData
                }
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "200px",
                }}
              />
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={handleEncrypt}
            style={{
              marginRight: "10px",
              padding: "12px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#A9A9A9",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Encrypt
          </button>
          <button
            type="button"
            onClick={handleDecrypt}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#444",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Decrypt
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              marginLeft: "10px",
              padding: "12px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#FF6347", // Red background
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Reset
          </button>
        </div>

        {formData.technique && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <h3>
              About{" "}
              {formData.technique.charAt(0).toUpperCase() +
                formData.technique.slice(1)}{" "}
              Cipher
            </h3>
            <p>
              <strong>Description:</strong>{" "}
              {infoText[formData.technique].description}
            </p>
            <p>
              <strong>How to Encrypt:</strong>{" "}
              {infoText[formData.technique].instructions}
            </p>
          </div>
        )}

        {/* Cipher Components */}
        {actionType && formData.technique === "caesar" && (
          <CaesarCipher
            inputText={formData.inputText}
            keyValue={key}
            actionType={actionType}
            onResult={(output) =>
              setFormData({ ...formData, outputText: output })
            }
          />
        )}

        {actionType && formData.technique === "vigenere" && (
          <VigenereCipher
            inputText={formData.inputText}
            keyword={formData.keyword || ""}
            actionType={actionType}
            onResult={(output) =>
              setFormData({ ...formData, outputText: output })
            }
          />
        )}

        {formData.technique === "vigenere" && (
          <button
            type="button"
            onClick={() => setShowImage(true)}
            style={{
              marginLeft: "10px",
              padding: "10px",
              fontSize: "14px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "white",
            }}
          >
            View Image
          </button>
        )}
        {isModalOpen && activeModal === "encrypt" && (
          <Modal1 isOpen={isModalOpen} onClose={closeModal} />
        )}
        {isModalOpen && activeModal === "decrypt" && (
          <Modal2 isOpen={isModalOpen} onClose={closeModal} />
        )}

        {actionType && formData.technique === "monoalphabetic" && (
          <MonoalphabeticCipher
            inputText={formData.inputText}
            cipherKey={formData.monoKey || ""}
            actionType={actionType}
            onResult={(output) =>
              setFormData({ ...formData, outputText: output })
            }
          />
        )}

        {actionType && formData.technique === "transposition" && (
          <TranspositionCipher
            inputText={formData.inputText}
            actionType={actionType}
            onResult={(output) =>
              setFormData({ ...formData, outputText: output })
            }
          />
        )}
              //

        {actionType && formData.technique === "affine" && (
          <AffineCipher
            inputText={formData.inputText}
            actionType={actionType}
            onResult={(output) =>
              setFormData({ ...formData, outputText: output })
            }
          />
        )}

        {actionType && formData.technique === "onetimepad" && (
          <OneTimePad
            inputText={formData.inputText}
            padKey={formData.keyword || ""}
            actionType={actionType}
            onResult={(output) =>
              setFormData({ ...formData, outputText: output })
            }
          />
        )}

        {actionType && formData.technique === "playfair" && (
          <PlayfairCipher
            inputText={formData.inputText}
            cipherKey={formData.keyword || ""} // Pass the updated keyword
            actionType={actionType}
            onResult={(output) =>
              setFormData({ ...formData, outputText: output })
            }
          />
        )}
      </form>

      {/* Modal for Image */}
      {showImage && formData.technique === "vigenere" && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowImage(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                lineHeight: "16px",
              }}
            >
              ✖
            </button>
            {/* Image */}
            <img
              src={Table}
              alt="Vigenere Table"
              style={{
                maxWidth: "90%",
                maxHeight: "80vh",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
//
export default MainForm;
