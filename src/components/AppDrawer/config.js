import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";


export default [
  {
    icon: <DashboardIcon />,
    primary: "Dashboard",
    list: [
      {
        icon: <></>,
        primary: "DashBoard",
        to: "/dashboard",
        permissions: ["PAGE_DASHBOARD"]
      }
    ]
  },

];
