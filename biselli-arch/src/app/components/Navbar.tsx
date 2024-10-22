"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useColor } from "../contexts/ColorContext";
import styles from "./Navbar.module.css";

interface NavItem {
  name: string;
  href: string;
  subitems: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    name: "Morphosis",
    href: "/",
    subitems: [
      { name: "Contact,", href: "/contact" },
      { name: "People,", href: "/people" },
      { name: "Media", href: "/media" },
    ],
  },
  {
    name: "Architecture",
    href: "/architecture",
    subitems: [
      { name: "A-Z,", href: "/architecture/a-z" },
      { name: "Year,", href: "/architecture/year" },
    ],
  },
  {
    name: "Planning",
    href: "/planning",
    subitems: [
      { name: "A-Z,", href: "/planning/a-z" },
      { name: "Year,", href: "/planning/year" },
    ],
  },
  {
    name: "Contact",
    href: "/contact",
    subitems: [
      { name: "Email,", href: "/email" },
      { name: "Phone,", href: "/phone" },
      { name: "Location", href: "/location" },
    ],
  },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>("Morphosis");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [isParentActive, setIsParentActive] = useState(true);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const router = useRouter();
  const { textColor, setTextColor } = useColor();

  useEffect(() => {
    setTextColor("white");
  }, []);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    itemName: string,
    href: string
  ) => {
    e.preventDefault();
    setActiveItem(itemName);
    setExpandedItem(itemName); // Always set the expanded item, never collapse
    setActiveSubItem(null);
    setIsParentActive(true);
    setTextColor("white");
    setClickedItem(itemName);
    router.push(href);
  };

  const handleSubItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    subItemName: string,
    href: string
  ) => {
    e.preventDefault();
    setActiveSubItem(subItemName);
    setIsParentActive(false);
    setTextColor("black");
    router.push(href);
  };

  const textStyle = isParentActive
    ? ({
        color: textColor,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: "3px",
        transition: "background-color 0.3s ease, color 0.3s ease",
        "--underline-color": "white",
        "--underline-height": "3px",
      } as React.CSSProperties)
    : ({
        color: textColor,
        backgroundColor: "transparent",
        borderRadius: "3px",
        transition: "background-color 0.3s ease, color 0.3s ease",
        "--underline-color": "black",
        "--underline-height": "3px",
      } as React.CSSProperties);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li
            key={item.name}
            className={`${styles.navItem} ${
              activeItem === item.name ? styles.active : ""
            }`}
          >
            <Link
              href={item.href}
              onClick={(e) => handleItemClick(e, item.name, item.href)}
              className={`${clickedItem === item.name ? styles.active : ""} ${
                styles.parentItem
              }`}
              style={{
                ...textStyle,
                "--underline-height": clickedItem === item.name ? "3px" : "0px",
              }}
            >
              {item.name}
            </Link>
            {expandedItem === item.name && (
              <div className={styles.subItems}>
                {item.subitems.map((subitem, index) => (
                  <span key={subitem.name}>
                    <Link
                      href={subitem.href}
                      onClick={(e) =>
                        handleSubItemClick(e, subitem.name, subitem.href)
                      }
                      className={
                        activeSubItem === subitem.name ? styles.active : ""
                      }
                      style={
                        isParentActive
                          ? textStyle
                          : ({
                              color: "black",
                              "--underline-color": "black",
                              "--underline-height": "1px",
                            } as React.CSSProperties)
                      }
                    >
                      {subitem.name}
                    </Link>
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
