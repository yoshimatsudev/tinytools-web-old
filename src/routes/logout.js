import React from "react";
import LoginPage from "./login";
import Cookies from "js-cookie";

const LogoutPage = () => {
  return (
    <>
      {Cookies.remove("tinytoolssession")}
      <LoginPage />;
    </>
  );
};

export default LogoutPage;
