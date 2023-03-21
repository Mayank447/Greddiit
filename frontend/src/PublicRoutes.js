import { Outlet, Navigate } from "react-router-dom";

import React from 'react'

export default function PublicRoutes() {
    const token=JSON.parse(localStorage.getItem("status"))

    return (
    token ? <Navigate to="/profilepage" /> : <Outlet /> 
  )
}
