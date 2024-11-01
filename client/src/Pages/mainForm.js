import React, { useState } from 'react';
import '../StyleSheet/mainFrom.css';
import Modal1 from '../Components/Modal1';
import Modal2 from '../Components/Modal2';

const MainForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    encryption: '',
    decryption: '',
    technique: '', 
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [actionType, setActionType] = useState(''); 
  const [isOutputEditable, setIsOutputEditable] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEncrypt = (e) => {
    e.preventDefault();
    if (formData.name && formData.technique) { 
      console.log('Encrypt Data:', formData);
      setActionType('encrypt'); 
      setIsOutputEditable(true); 
      setActiveModal('encrypt');
      setModalOpen(true);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDecrypt = (e) => {
    e.preventDefault();
    if (formData.name && formData.technique) { 
      console.log('Decrypt Data:', formData);
      setActionType('decrypt'); 
      setIsOutputEditable(true); 
      setActiveModal('decrypt');
      setModalOpen(true);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveModal(null);
    setIsOutputEditable(false); 
  };

  return (
    <div className="container">
      <h2 className="heading">Information Security Project</h2>
      <form className="form">
        <label className="label">Enter your text</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          required
        />


        <label className="label">Your {actionType === 'encrypt' ? 'encrypted' : 'decrypted'} text</label>
        <input
          type="text"
          name="output"
          value={formData[actionType]} 
          onChange={handleChange}
          className="input"
          required
          disabled={!isOutputEditable} 
          style={{ color: 'gray', border: 'gray' }} 
        />

        <label className="label">Choose Technique</label>
        <select
          name="technique"
          value={formData.technique}
          onChange={handleChange}
          className="input"
          required
          style={{ background: 'black' }}
        >
          <option value="">Select a technique</option>
          <option value="technique1">Technique 1</option>
          <option value="technique2">Technique 2</option>
          <option value="technique3">Technique 3</option>
        </select>

        <button type="button" className="button" onClick={handleEncrypt} style={{ marginBottom: "10px" }}>
          Encrypt
        </button>
        <button type="button" className="button" onClick={handleDecrypt}>
          Decrypt
        </button>
      </form>
     
      {activeModal === 'encrypt' && <Modal1 isOpen={isModalOpen} onClose={closeModal} />}
      {activeModal === 'decrypt' && <Modal2 isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default MainForm;
