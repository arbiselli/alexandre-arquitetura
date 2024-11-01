"use client";

import { useColor } from "./contexts/ColorContext";

export default function Home() {
  const { textColor } = useColor();

  return <h1 style={{ color: textColor }}></h1>;
}
