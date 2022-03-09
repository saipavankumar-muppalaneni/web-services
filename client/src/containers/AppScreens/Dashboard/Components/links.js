import {
  DashboardOutlined,
  PieChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  TagFilled
} from "@ant-design/icons";
import { FaTag } from "react-icons/fa";
export const links = [
  {
    name: "Dashbaord",
    type: "link",
    link: "/dashboard",
    icon: DashboardOutlined,
    subtext: 'Analytics'
  },
  {
    name: "Queues",
    type: "link",
    link: "/dashboard/queues",
    icon: PieChartOutlined,
    subtext: 'Analytics'

  },
  {
    name: "Venue",
    type: "link",
    link: "/dashboard/settings",
    icon: SettingOutlined,
    subtext: 'setup about Your Venues'

  },
  {
    name: "Offers",
    type: "link",
    link: "/dashboard/Offers",
    icon: TagFilled,
  },
  {
    name: "Logout",
    type: "action",
    link: "/dashboard/Logout",
    icon: LogoutOutlined,
  },
];
