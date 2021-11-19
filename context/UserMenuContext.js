import { createContext, useState, useEffect } from "react";

const UserMenuContext = createContext();

export const UserMenuProvider = ({ childern }) => {
  const [menuNumber, setMenuNumber] = useState("1");
  return (
    <UserMenuContext.Provider value={[menuNumber, setMenuNumber]}>
      {childern}
    </UserMenuContext.Provider>
  );
};

export default UserMenuContext;
