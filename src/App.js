import React from 'react';


import './App.css';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import AuthPage from './components/auth/AuthPage';
import FlightResult from '..//./src/components/FlightResults/FlightResults'
import ResetPassword from './components/auth/ResetPassword'
import AirPreBookForm from './components/FlightBooking/AirPreBookForm';
import AirBookForm from './components/FlightBooking/AirBookForm';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/signin" component={AuthPage}/>
        <Route path="/flight-results" component={FlightResult}/>
        <Route path="/forgot-password" component={ResetPassword}/>
        <Route path="/airprebookform" component={AirPreBookForm}/>
        <Route path="/airbook" component={AirBookForm}/>
        
        
        
        
        
       
        {/* Comment out any other routes */}
      </Switch>
    </div>
  );
}

export default App;
