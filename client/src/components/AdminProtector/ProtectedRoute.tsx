
import React from "react";
import { Navigate } from "react-router-dom";
import { useCustomSelector } from "../../hooks/hooks";

const ProtectedAdmin = ({ children }:any) => {
  const { token } = useCustomSelector((state) => state.user);


  if (token !== '') {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedAdmin;