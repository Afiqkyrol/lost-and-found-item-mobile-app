import { useState } from "react";
import { createContext } from "react";

export const LostItemContext = createContext({
  items: [],
  addItem: (lostItem) => {},
});

function LostItemContextProvider({ children }) {
  const [item, setItem] = useState([]);

  function addItem(lostItem) {
    setItem(lostItem);
  }

  const value = {
    items: item,
    addItem: addItem,
  };

  return (
    <LostItemContext.Provider value={value}>
      {children}
    </LostItemContext.Provider>
  );
}

export default LostItemContextProvider;
