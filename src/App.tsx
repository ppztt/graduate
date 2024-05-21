import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routers } from './router';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routers></Routers>
      </Router>
    </div>
  );
}

export default App;
