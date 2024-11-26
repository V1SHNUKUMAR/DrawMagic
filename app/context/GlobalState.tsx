import React, { useState } from "react";
import { createContext } from "vm";

export const GlobalContext = createContext(undefined);

const GlobalState = ({ children }: any) => {
  const [brushDets, setBrushDets] = useState({
    brushThickness: 5,
    brushOpacity: 100,
  });
  return (
    <GlobalContext.Provider value={{ brushDets, setBrushDets }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
