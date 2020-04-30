import React from 'react';
import './App.css';
import ReactRogue from './components/ReactRogue';

const App = () => (
  <div className="App">
   <ReactRogue width={40} height={40} borderColor="#F9A825" tilesize={16} />
  </div>
);

export default App;
