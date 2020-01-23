import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './game/game'
import GameHistory from './history'
import UserRegestration from './userregestration/user'
import { BrowserRouter as Router,Route, Link, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
    <div>
    <Switch>
      <Route path={`/`} component={UserRegestration}/>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
