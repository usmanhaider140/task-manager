import { createContext, useContext, useState } from "react";

const ConstructionSitesContext = createContext({});

export const ConstructionSitesProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedConstructionSites, setSelectedConstructionSites] = useState(
    []
  );

  const value = {
    drawerOpen,
    setDrawerOpen,
    selectedConstructionSites,
    setSelectedConstructionSites,
  };

  return (
    <ConstructionSitesContext.Provider value={value}>
      {children}
    </ConstructionSitesContext.Provider>
  );
};

const useConstructionSites = () =>
  useContext < ConstructionSitesContext > ConstructionSitesContext;

export default useConstructionSites;
