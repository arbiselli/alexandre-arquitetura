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
      {
        name: "Media",
        href: "/media",
        nestedItems: [{ name: "Awards", href: "/media/awards" }],
      },
    ],
  },
  {
    name: "Architecture",
    href: "/architecture",
    subitems: [
      {
        name: "A-Z,",
        href: "/architecture/a-z",
        nestedItems: [
          { name: "#", href: "/architecture/a-z?q=num" },
          { name: "A", href: "/architecture/a-z?q=a" },
          { name: "B", href: "/architecture/a-z?q=b" },
          { name: "C", href: "/architecture/a-z?q=c" },
          { name: "D", href: "/architecture/a-z?q=d" },
          { name: "E", href: "/architecture/a-z?q=e" },
          { name: "F", href: "/architecture/a-z?q=f" },
          { name: "G", href: "/architecture/a-z?q=g" },
          { name: "H", href: "/architecture/a-z?q=h" },
          { name: "I", href: "/architecture/a-z?q=i" },
          { name: "J", href: "/architecture/a-z?q=j" },
          { name: "K", href: "/architecture/a-z?q=k" },
          { name: "L", href: "/architecture/a-z?q=l" },
          { name: "M", href: "/architecture/a-z?q=m" },
          { name: "N", href: "/architecture/a-z?q=n" },
          { name: "O", href: "/architecture/a-z?q=o" },
          { name: "P", href: "/architecture/a-z?q=p" },
          { name: "Q", href: "/architecture/a-z?q=q" },
          { name: "R", href: "/architecture/a-z?q=r" },
          { name: "S", href: "/architecture/a-z?q=s" },
          { name: "T", href: "/architecture/a-z?q=t" },
          { name: "U", href: "/architecture/a-z?q=u" },
          { name: "V", href: "/architecture/a-z?q=v" },
          { name: "W", href: "/architecture/a-z?q=w" },
          { name: "X", href: "/architecture/a-z?q=x" },
          { name: "Y", href: "/architecture/a-z?q=y" },
          { name: "Z", href: "/architecture/a-z?q=z" },
        ],
      },
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

  const handleNestedItemClick = (letter: string) => {
    // Navigate to the A-Z page with the selected letter as a query parameter
    router.push(`/architecture/a-z?q=${letter}`);
  };

  const textStyle = isParentActive
    ? ({
        color: textColor,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "3px",
        "--underline-color": "white",
        "--underline-height": "3px",
      } as React.CSSProperties)
    : ({
        color: textColor,
        backgroundColor: "transparent",
        borderRadius: "3px",
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
                {/* Render main subitems */}
                {item.subitems.map((subitem) => (
                  <span className="span-subitem" key={subitem.name}>
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

                {/* Render nested items if their parent is active */}
                {item.subitems.map((subitem) =>
                  subitem.nestedItems && activeSubItem === subitem.name ? (
                    <div
                      key={`nested-${subitem.name}`}
                      className={styles.nestedItems}
                      data-parent={subitem.name}
                    >
                      {subitem.nestedItems.map((nestedItem) => (
                        <Link
                          key={nestedItem.name}
                          href={nestedItem.href}
                          onClick={() => handleNestedItemClick(nestedItem.name)}
                          className={
                            activeNestedItem === nestedItem.name
                              ? styles.active
                              : ""
                          }
                          style={{ color: "black" }}
                        >
                          {nestedItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : null
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
