// yoga-admission-form/src/AdmissionForm.js
import React, { useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import {Link}from 'react-router-dom';
import './AdmissionForm.css';
import './Payment';
const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: 20,
    selectedBatch: '',
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIncrementAge = () => {
    setFormData({
      ...formData,
      age: formData.age + 1,
    });
  };

  const handleDecrementAge = () => {
    setFormData({
      ...formData,
      age: formData.age - 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.age < 18 || formData.age > 65) {
      alert('Please enter a valid age between 18 and 65.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/admission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log(result); // Handle the response accordingly
  
      if (result.success) {
        // Redirect to the payment page
        window.location.href = '/';
      } else {
        // Handle error, show a message, or stay on the same page
        console.error('Enrollment failed:', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div id="Home">
    <form onSubmit={handleSubmit}>
      <label>
        <h2>Name:</h2>
        <input type="text" id="name" name='name' value={formData.name} onChange={(e) => handleInputChange(e)} required />
      </label>
      <br />
      <label>
        <h2>Age</h2>
        <input type="number" id="age" value={formData.age} onChange={handleInputChange} min={18} max={65} required />
          <button type="button" id="age" onClick={handleIncrementAge}>+</button>
          <button type="button" id="age" onClick={handleDecrementAge}>-</button>      </label>
      <br />
      <label>
        <h2>Select Batch:</h2>
        <select id="selectedBatch" value={formData.selectedBatch} name='selectedBatch' onChange={handleInputChange} required>
          <option value="">Select Batch</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
      </label>
      <br />
      <br/>
      <Link to="/Applicants" > <button id="enroll" onClick={(e) => handleSubmit(e)}>Enroll</button></Link>
    </form>
    <br/>

{/* Conditional rendering of Applicants component */}
    </div>
  );
};

export default AdmissionForm;
