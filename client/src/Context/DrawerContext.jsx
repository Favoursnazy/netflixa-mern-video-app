import React, { createContext, useMemo, useState } from "react";

export const SideBarContext = createContext();

const DrawerContext = ({ children }) => {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [progress, setProgress] = useState(0);
  const toggleDrawer = () => setMobileDrawer(!mobileDrawer);
  const value = useMemo(
    () => ({ mobileDrawer, toggleDrawer, progress, setProgress }),
    [mobileDrawer, progress]
  );
  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};
export default DrawerContext;
