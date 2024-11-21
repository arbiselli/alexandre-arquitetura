import { ReactNode, Suspense } from "react";
import BackgroundVideo from "./components/BackgroundVideo";
import LoadingBar from "./components/LoadingBar";
import Navbar from "./components/Navbar";
import RouteBackground from "./components/RouteBackground";
import { ColorProvider } from "./contexts/ColorContext";
import "./fonts/fonts.css";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata = {
  title: "Morphopedia",
  description: "Your app description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ColorProvider>
        <body>
          <LoadingBar />
          <BackgroundVideo />
          <RouteBackground />
          <Navbar />
          <Suspense>{children}</Suspense>
          <main className={styles.main}>{children}</main>
        </body>
      </ColorProvider>
      <Suspense>{children}</Suspense>
    </html>
  );
}
