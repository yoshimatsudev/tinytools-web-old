import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const IndexPage = () => {
  if (Cookies.get("tinytoolssession")) {
    return <Navigate to="/home" />;
  }

  return <Navigate to="/login" />;
};

export default IndexPage;
