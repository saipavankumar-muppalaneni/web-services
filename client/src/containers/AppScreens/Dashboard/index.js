import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Analytics from "../Analytics";

import Header from "./Components/header";
import Menu from "./Components/SIdeMenu";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="flex-col flex1">
      <Header />

      <div
        className={"flex1 flex-row bg-grey " + styles.dashboardContainer}
        style={{ height: "100vh", overflowY: "scroll", }}
      >
        <Analytics />
      </div>
    </div>
  );
}

export default Dashboard;
