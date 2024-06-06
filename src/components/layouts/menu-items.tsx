import { MdOutlineDashboard, MdOutlineTableBar } from "react-icons/md";
import { PiForkKnife } from "react-icons/pi";
import { BiDish } from "react-icons/bi";
import { TbInvoice } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: "Tableau de bord",
    href: "/",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "Commandes",
    href: "/commandes",
    icon: <TbInvoice />,
  },
  {
    name: "Plats",
    href: "/plats",
    icon: <PiForkKnife />,
  },
  {
    name: "Menu",
    href: "/menu",
    icon: <BiDish />,
  },
  {
    name: "Tables",
    href: "/tables",
    icon: <MdOutlineTableBar />,
  },

  {
    name: "Utilisateurs",
    href: "/utilisateurs",
    icon: <FaRegUser />,
  },
];
