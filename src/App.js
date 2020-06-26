import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { WebMapView } from "./components/WebMapView"
import HeaderComponent from "./components/Header";
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <WebMapView/>
    </div>
  );
}

export default App;
