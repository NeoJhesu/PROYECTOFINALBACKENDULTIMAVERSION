import React, { createContext, useContext, useState } from 'react'
const Context = createContext()
const ContexProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <Context.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </Context.Provider>
  )
}

export const useCustomContext = () => useContext(Context)

export default ContexProvider