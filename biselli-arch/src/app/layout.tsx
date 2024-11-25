import LoadingBar from "./components/LoadingBar";
import Navbar from "./components/Navbar";
import { ColorProvider } from "./contexts/ColorContext";
import "./fonts/fonts.css";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata = {
  title: "biselli studio",
  description: "biselli studio architectures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ColorProvider>
        <body>
          <LoadingBar />
          {/* <BackgroundVideo /> */}
          {/* <RouteBackground /> */}
          <h1 className={styles.logoTitle}>biselli studio</h1>
          <Navbar />
          <main className={styles.main}>{children}</main>
        </body>
      </ColorProvider>
    </html>
  );
}
