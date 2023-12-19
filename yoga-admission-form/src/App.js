// yoga-admission-form/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdmissionForm from './AdmissionForm';
import Payment from './Payment';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<AdmissionForm />} />
          <Route path="/Payment" element={<Payment />} />
        </Routes>
    
    </Router>
  );
}

export default App;
