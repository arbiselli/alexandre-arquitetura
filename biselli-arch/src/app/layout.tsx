import BackgroundVideo from "./components/BackgroundVideo";
import Navbar from "./components/Navbar";
import { ColorProvider } from "./contexts/ColorContext";
import "./fonts/fonts.css";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata = {
  title: "Morphopedia",
  description: "Your app description",
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
          <BackgroundVideo />
          <Navbar />
          <main className={styles.main}>{children}</main>
        </body>
      </ColorProvider>
    </html>
  );
}
