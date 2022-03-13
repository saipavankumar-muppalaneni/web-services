import React from "react";
import { Text } from "../../../../elements";
import { colors } from "../../../../constants";
import { BellOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { links } from "./links";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks/UserContext";


function Header() {
  const location = useLocation();

  const { additionalUserInfo,logout } = useAuth()
  return (
    <div className="flex-row justify-between align-center space10">
      <div>

      <Button onClick={logout}>
        Logout
      </Button>
      </div>
      <div>
        <Text size={22} weight={500}>
          {links.find((item) => item.link == location.pathname)?.name}
        </Text>
        <Text size={12} weight={500} style={{ color: colors.textGrey }}>
          {links.find((item) => item.link == location.pathname)?.subtext}
        </Text>
      </div>
      <div className="flex-row">
        {/* <div
          style={{
            backgroundColor: "#fff",
            width: 40,
            height: 40,
            borderColor: colors.textGrey,
            borderWidth: 1,
            borderRadius: 5,
            borderStyle: "solid",
          }}
          className="flex-row align-center justify-center"
        >
          <BellOutlined style={{ color: colors.textGrey, fontSize: 17 }} />
        </div> */}
        <div className="space5"></div>

        <div className="flex-col align-end">
          <Text size={14} weight={600} style={{ color: colors.textGrey }}>
            {additionalUserInfo.name}
          </Text>
          <Text size={12} weight={500} style={{ color: colors.textGrey }}>
            Admin
          </Text>
        </div>
        <div className="space5"></div>
        <div>
          {/* <Avatar size={"large"} /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
