import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, handleState] = useState(() => {
    const storedAuthState = localStorage.getItem('authState');
    const initialState = storedAuthState
      ? JSON.parse(storedAuthState)
      : { isAuth: false, token: null };
    return initialState;
  });

  const loginUser = (payload) => {
    const authState = {
      isAuth: true,
      token: payload
    };
    handleState(authState);
    localStorage.setItem('authState', JSON.stringify(authState));
  };

  const logoutUser = () => {
    const authState = {
      isAuth: false,
      token: null
    };
    handleState(authState);
    localStorage.setItem('authState', JSON.stringify(authState));
  };

 

  return (
    <AuthContext.Provider value={{ state, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
