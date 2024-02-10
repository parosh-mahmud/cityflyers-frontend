// AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '..//../firebaseconfig.js'; // Adjust the import path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const contextValue = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCont = () => {
  return useContext(AuthContext);
};
