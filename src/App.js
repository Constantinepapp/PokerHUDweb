import React, { useState,useEffect }  from 'react';
import './App.css'
import NavBar from './Components/Core/NavBar'
import ReactGA from 'react-ga';
import Home from './views/Home'
import Equity from './views/Equity'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


 




function App() {
  
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  useEffect(()=>{
    ReactGA.initialize('UA-168226120-2');
    ReactGA.pageview('pokerstats/')

  },[])

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/equity">
            <Equity/>
          </Route>
            
        </Switch>
        
      </Router>
      
      
      
    </div>
  );
}

export default App;
