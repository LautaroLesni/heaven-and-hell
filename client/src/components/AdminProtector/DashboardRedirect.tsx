
import React from "react";
import { Navigate } from "react-router-dom";

const DashboardRedirect = () => {

    return <Navigate to="/dashboard/home" replace />;
  
};

export default DashboardRedirect;