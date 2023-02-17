
import React from "react";
import { Navigate } from "react-router-dom";
import { useCustomSelector } from "../../hooks/hooks";

const IsLogged = ({ children }:any) => {
  const { token } = useCustomSelector((state) => state.user);


  if (token !== '') {
      return <Navigate to="/" replace />;
    } 
    else {
        return children;
    }
};

export default IsLogged;