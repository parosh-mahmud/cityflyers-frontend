import React, { useState } from 'react'
import SignUp from './SignUp';
import Login from './Login';

const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };
  return (
    <div>
      {showLogin ? <Login /> : <SignUp handleToggle={handleToggle} />}
      <button onClick={handleToggle}>
        
      </button>
    </div>
  )
}

export default AuthPage
