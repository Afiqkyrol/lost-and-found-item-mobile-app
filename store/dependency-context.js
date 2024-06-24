import { createContext, useState } from "react";

export const DependencyContext = createContext({
  dummy: [],
  triggerEffect: () => {},
});

function DependencyContextProvider({ Children }) {
  const [newDummy, setNewDummy] = useState("");

  function triggerEffect() {
    setNewDummy([1, 2]);
  }

  const value = {
    dummy: newDummy,
    triggerEffect: triggerEffect,
  };

  return (
    <DependencyContext.Provider value={value}>
      {Children}
    </DependencyContext.Provider>
  );
}

export default DependencyContextProvider;
