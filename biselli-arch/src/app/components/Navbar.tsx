"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useColor } from "../contexts/ColorContext";
import styles from "./Navbar.module.css";

interface SubItem {
  name: string;
  href: string;
  nestedItems?: { name: string; href: string }[];
}

interface NavItem {
  name: string;
  href: string;
  subitems: SubItem[];
}

const navItems: NavItem[] = [
  {
    name: "Morphosis",
    href: "/about",
    subitems: [
      { name: "Contact,", href: "/contact" },
      {
        name: "People,",
        href: "/people",
        nestedItems: [
          { name: "Partners", href: "/people?q=partners" },
          { name: "Leadership", href: "/people?q=leadership" },
        ],
      },
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
];

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Morphosis");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [isParentActive, setIsParentActive] = useState(true);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { textColor, setTextColor, setShowVideo } = useColor();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  let timeoutId: NodeJS.Timeout;
  const [activeNestedItem] = useState<string | null>(null);

  console.log(isParentActive);

  useEffect(() => {
    setTextColor("white");
  }, []);

  useEffect(() => {
    for (const item of navItems) {
      // Check if it's a subitem
      const matchingSubItem = item.subitems.find(
        (subitem) => subitem.href === pathname
      );

      if (matchingSubItem) {
        setActiveItem(item.name);
        setExpandedItem(item.name);
        setActiveSubItem(matchingSubItem.name);
        setIsParentActive(false);
        setClickedItem(item.name);
        setTextColor("black");
        setShowVideo(false);
        return;
      }

      // Check if it's a parent item
      if (item.href === pathname) {
        setActiveItem(item.name);
        setExpandedItem(item.name);
        setActiveSubItem(null);
        setIsParentActive(true);
        setClickedItem(item.name);
        setTextColor("white");
        setShowVideo(true);
        return;
      }
    }
  }, [pathname]);

  useEffect(() => {
    setTextColor("white");
    setShowVideo(isParentActive);
    setIsLoading(false);
  }, []);

  const handleItemClick = (name: string, href: string) => {
    setActiveItem(name);
    setExpandedItem(name);
    setActiveSubItem(null);
    setIsParentActive(true);
    setClickedItem(name);
    setTextColor("white");
    setShowVideo(true);
    router.push(href);
  };

  const handleSubItemClick = (
    parentName: string,
    subItemName: string,
    href: string
  ) => {
    setActiveItem(parentName);
    setExpandedItem(parentName);
    setActiveSubItem(subItemName);
    setIsParentActive(false);
    setClickedItem(parentName);
    setTextColor("black");
    setShowVideo(false);
    router.push(href);
  };

  const textStyle = isParentActive
    ? ({
        color: textColor,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "3px",
        // transition: "background-color 0.3s ease, color 0.3s ease",
        "--underline-color": "white",
        "--underline-height": "3px",
      } as React.CSSProperties)
    : ({
        color: textColor,
        backgroundColor: "transparent",
        borderRadius: "3px",
        // transition: "background-color 0.3s ease, color 0.3s ease",
        "--underline-color": "black",
        "--underline-height": "3px",
      } as React.CSSProperties);

  const handleUserActivity = useCallback(() => {
    setIsVisible(true);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 103500); // 5 seconds
  }, []);

  useEffect(() => {
    // Initial timeout
    handleUserActivity();

    // Add event listeners for user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleUserActivity);
    });

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [handleUserActivity]);

  if (isLoading) {
    return null;
  }

  return (
    <nav
      className={`${styles.navbar} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
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
              onClick={() => handleItemClick(item.name, item.href)}
              className={`${clickedItem === item.name ? styles.active : ""} ${
                styles.parentItem
              }`}
              style={textStyle}
            >
              {item.name}
            </Link>

            {expandedItem === item.name && (
              <div className={styles.subItems}>
                {/* First render all main subitems */}
                {item.subitems.map((subitem) => (
                  <span key={subitem.name}>
                    <Link
                      href={subitem.href}
                      onClick={() =>
                        handleSubItemClick(
                          item.name,
                          subitem.name,
                          subitem.href
                        )
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

                {/* Then render nested items if their parent is active */}
                {item.subitems.map(
                  (subitem) =>
                    subitem.nestedItems &&
                    activeSubItem === subitem.name && (
                      <div
                        key={`nested-${subitem.name}`}
                        className={styles.nestedItems}
                      >
                        {subitem.nestedItems.map((nestedItem) => (
                          <Link
                            key={nestedItem.name}
                            href={nestedItem.href}
                            onClick={() => router.push(nestedItem.href)}
                            className={
                              activeNestedItem === nestedItem.name
                                ? styles.active
                                : ""
                            }
                            style={
                              {
                                color: "black",
                                "--underline-color": "black",
                                "--underline-height": "1px",
                              } as React.CSSProperties
                            }
                          >
                            {nestedItem.name}
                          </Link>
                        ))}
                      </div>
                    )
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
