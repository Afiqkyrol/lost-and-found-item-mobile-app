import { useState } from "react";
import { createContext } from "react";

export const FoundItemContext = createContext({
  items: [],
  addItem: (foundItem) => {},
});

function FoundItemContextProvider({ children }) {
  const [item, setItem] = useState([]);

  function addItem(foundItem) {
    setItem(foundItem);
  }

  const value = {
    items: item,
    addItem: addItem,
  };

  return (
    <FoundItemContext.Provider value={value}>
      {children}
    </FoundItemContext.Provider>
  );
}

export default FoundItemContextProvider;
