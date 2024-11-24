import React, { useState } from "react";
import "../StyleSheet/mainFrom.css";
import CaesarCipher from "../Components/Cesar";
import VigenereCipher from "../Components/Vigenere";
import MonoalphabeticCipher from "../Components/Monoalphabetic";
import Table from "../Asserts/table.png";
import Modal1 from '../Components/Modal1';
import Modal2 from '../Components/Modal2';


const MainForm = () => {
  const [formData, setFormData] = useState({
    inputText: "",
    outputText: "",
    technique: "",
    keyword: "",
    monoKey: "", // Added monoKey to handle Monoalphabetic Cipher
  });
  const [key, setKey] = useState(3); // Default key value
  const [actionType, setActionType] = useState(""); 
  const [showImage, setShowImage] = useState(false); 
  const [isModalOpen, setModalOpen] = useState(false); 
const [activeModal, setActiveModal] = useState(null); 

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
    if (
      formData.technique === "caesar" ||
      formData.technique === "vigenere" ||
      formData.technique === "monoalphabetic"
    ) {
      setActionType("encrypt");
      setModalOpen(true);
    } else {
      alert("Please select a valid cipher technique.");
    }
  };

  const handleDecrypt = () => {
    if (
      formData.technique === "caesar" ||
      formData.technique === "vigenere" ||
      formData.technique === "monoalphabetic"
    ) {
      setActionType("decrypt");
      setModalOpen(true);
    } else {
      alert("Please select a valid cipher technique.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveModal(null);
  };

  return (
    <div className="container">
      <h2 className="heading">Information Security Project</h2>
      <form className="form">
        <label className="label">Enter your text</label>
        <textarea
          name="inputText"
          value={formData.inputText}
          onChange={handleChange}
          rows="5"
          style={{
            width: "100%",
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
          rows="5"
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            fontSize: "14px",
            backgroundColor: "#f0f0f0",
          }}
        />
        <br />
        <label className="label">Choose Technique</label>
        <select
          name="technique"
          value={formData.technique}
          onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
          className="input"
          required
          style={{ background: "black", color: "white", marginTop: "10px" }}
        >
          <option value="">Select a technique</option>
          <option value="caesar">Caesar Cipher</option>
          <option value="vigenere">Vigenere Cipher</option>
          <option value="monoalphabetic">Monoalphabetic Cipher</option>
        </select>
        <br />
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

        <br />
        <button
  type="button"
  onClick={handleEncrypt}
  style={{
    marginRight: "10px",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#A9A9A9", // Green background
    color: "white",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s, transform 0.2s",
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#A9A9A9")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#D3D3D3")}
  onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
  onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
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
    backgroundColor: "#000000", // Black background
    color: "white",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s, transform 0.2s",
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#333333")} // Darker on hover
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#000000")}
  onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
  onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
>
  Decrypt
</button>



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
      </form>

      {activeModal === 'encrypt' && <Modal1 isOpen={isModalOpen} onClose={closeModal} />}
      {activeModal === 'decrypt' && <Modal2 isOpen={isModalOpen} onClose={closeModal} />}

      {actionType && formData.technique === "caesar" && (
        <CaesarCipher
          inputText={formData.inputText}
          keyValue={key}
          actionType={actionType}
          onResult={(output) => setFormData({ ...formData, outputText: output })}
        />
      )}

      {actionType && formData.technique === "vigenere" && (
        <VigenereCipher
          inputText={formData.inputText}
          keyword={formData.keyword || ""}
          actionType={actionType}
          onResult={(output) => setFormData({ ...formData, outputText: output })}
        />
      )}

{actionType && formData.technique === "monoalphabetic" && (
  <MonoalphabeticCipher
    inputText={formData.inputText}
    cipherKey={formData.monoKey || ""} // Use cipherKey instead of key
    actionType={actionType}
    onResult={(output) => setFormData({ ...formData, outputText: output })}
  />
)}


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

export default MainForm;
