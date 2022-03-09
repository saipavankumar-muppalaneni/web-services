import styles from "../Dashboard.module.css";
import { useState } from "react";
import { links } from "./links";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../../fbconfig";
import { useAuth } from "../../../../hooks/UserContext";

export default function Menu() {
  const handleClick = (e) => {
    console.log("click ", e);
  };
  const { logout } = useAuth();
  const location = useLocation();
  const [selected, setselected] = useState(0);
  const navigate = useNavigate();
  return (
    <div className={styles.sideMenuContainer}>
      {links.map((item, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              if (item.type == "link") {
                navigate(item.link);
              } else if (item.type == "action") {
                logout();
              }
            }}
            className={
              location.pathname == item.link
                ? styles.menuButtonSelected
                : styles.menuButtonunSelected
            }
          >
            <item.icon style={{ marginRight: 7 }} /> {item.name}
          </button>
        );
      })}
    </div>
  );
}
