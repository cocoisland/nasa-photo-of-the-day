import React from "react";
import "./App.css";

import NasaList from './components/NasaList'
import PetList from './components/PetList';

function App() {
  return (
    <div className="App">
      <h1>API</h1>
        <NasaList />
        {/* <PetList /> */}
        {/* <CleanUpEffect /> */}
    </div>
  );
}

export default App;
