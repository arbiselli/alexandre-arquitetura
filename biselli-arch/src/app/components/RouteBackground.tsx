"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./RouteBackground.module.css";

// Image mapping per route
const routeImages: { [key: string]: string[] } = {
  "/about": [
    "/about/jean-carlo-emer-Vsqq_O5_b2Y-unsplash.jpg",
    "/about/nick-night-52F2gX0COs4-unsplash.jpg",
    "/about/upal-patel-3kdroYxiOn4-unsplash.jpg",
  ],
  "/architecture": [
    "/architecture/jimmy-chang-ACt8ycSzpdE-unsplash.jpg",
    "/architecture/lance-anderson-QdAAasrZhdk-unsplash.jpg",
    "/architecture/osman-rana-5LED2xbiKvk-unsplash.jpg",
  ],
  "/planning": [
    "/planning/image1.jpg",
    "/planning/image2.jpg",
    "/planning/image3.jpg",
  ],
};

const RouteBackground: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const pathname = usePathname();

  // Get base route (e.g., /architecture/a-z -> /architecture)
  const baseRoute = "/" + pathname.split("/")[1];
  const currentRouteImages = routeImages[baseRoute] || [];

  useEffect(() => {
    if (pathname === "/" || !currentRouteImages.length) return;

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentRouteImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [pathname, currentRouteImages]);

  // Don't render anything on home route or if it's a subitem
  if (
    pathname === "/" ||
    pathname.split("/").length > 2 ||
    !currentRouteImages.length ||
    !currentRouteImages[currentImageIndex]
  ) {
    return null;
  }

  return (
    <div className={styles.imageContainer}>
      <Image
        src={currentRouteImages[currentImageIndex]}
        alt=""
        fill
        priority
        className={styles.backgroundImage}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default RouteBackground;
