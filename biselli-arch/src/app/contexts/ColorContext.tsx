"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ColorContextType {
  textColor: string;
  setTextColor: (color: string) => void;
  showVideo: boolean;
  setShowVideo: (show: boolean) => void;
}

export const ColorContext = createContext<ColorContextType>({
  textColor: "white",
  setTextColor: () => {},
  showVideo: true,
  setShowVideo: () => {},
});

interface ColorProviderProps {
  children: ReactNode;
}

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [textColor, setTextColor] = useState<string>("white");
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    // List of paths that should have white background (child items)
    const whiteBackgroundPaths = [
      "/people",
      "/media",
      "/contact",
      "/architecture",
      "/architecture/year",
      "/planning/a-z",
      "/planning/year",
    ];

    // Check if current path should have white background
    const shouldHaveWhiteBackground =
      whiteBackgroundPaths.includes(pathname) ||
      pathname.startsWith("/architecture/");

    // Set initial states based on current path
    if (shouldHaveWhiteBackground) {
      setShowVideo(false);
      setTextColor("black");
    } else {
      setShowVideo(true);
      setTextColor("white");
    }
  }, [pathname]);

  return (
    <ColorContext.Provider
      value={{
        textColor,
        setTextColor,
        showVideo,
        setShowVideo,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
};
