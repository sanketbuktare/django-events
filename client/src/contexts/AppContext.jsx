/* eslint-disable */
import React, { useState } from "react";

const AppContext = React.createContext();

const AppContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState();

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
