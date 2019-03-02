import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Update from './components/Update';
import Show from './components/Show';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/update" component={Update} />
            <Route path="/show" component={Show} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
