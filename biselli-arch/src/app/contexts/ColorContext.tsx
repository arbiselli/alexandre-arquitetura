"use client";

import React, { createContext, useContext, useState } from "react";

type ColorContextType = {
  textColor: string;
  setTextColor: (color: string) => void;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [textColor, setTextColor] = useState("black");

  return (
    <ColorContext.Provider value={{ textColor, setTextColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
