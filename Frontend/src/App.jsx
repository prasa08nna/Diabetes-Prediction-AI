import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    dpf: '', // Diabetes Pedigree Function
    age: '',
  });

  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        input_data: Object.values(formData).map((value) => parseFloat(value)),
      });
      // Set result based on the server response
      console.log(response.data['prediction'])
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
      setResult('An error occurred while predicting.');
    }
  };

  return (
    <div className="app">
      <h1>Diabetes Prediction</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Pregnancies:
          <input
            type="number"
            name="pregnancies"
            value={formData.pregnancies}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Glucose:
          <input
            type="number"
            name="glucose"
            value={formData.glucose}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Blood Pressure:
          <input
            type="number"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Skin Thickness:
          <input
            type="number"
            name="skinThickness"
            value={formData.skinThickness}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Insulin:
          <input
            type="number"
            name="insulin"
            value={formData.insulin}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          BMI:
          <input
            type="number"
            step="0.1"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Diabetes Pedigree Function:
          <input
            type="number"
            step="0.01"
            name="dpf"
            value={formData.dpf}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Predict</button>
      </form>
      {result && <h2>Result: {result}</h2>}
    </div>
  );
};

export default App;
