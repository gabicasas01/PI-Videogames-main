import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import GameDetail from './components/GameDetail';
import Form from './components/Form';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <div className="App">
      
      <Route exact path="/" component={LandingPage}/>
      {/* <Route exact path="/Home" component={Navbar}/> */}
      <Route exact path="/Home" component={Home}/>
      <Route exact path="/games/:id" component={GameDetail}/>
      <Route exact path="/create" component={Form}/>
    </div>
  );
}

export default App;
