import { createContext } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Cookies from "js-cookie";
import { TOKEN } from "../constants";

export const AuthContex = createContext();

const AuthContexProvider = ({ children }) => {
  const token = Cookies.get(TOKEN);
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

  let state = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return <AuthContex.Provider value={state}>{children}</AuthContex.Provider>;
};

AuthContexProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContexProvider;
