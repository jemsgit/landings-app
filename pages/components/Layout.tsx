// components/Layout.tsx
import React, { ReactNode } from "react";
import "../../app/globals.css"; // Make sure to import global CSS here
import styles from "./Layout.module.css";

import localFont from "next/font/local";

const geistMono = localFont({
  src: "../../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = localFont({
  src: "../../app/fonts/Inter-Variable.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`${inter.variable} ${geistMono.variable}`}>
      <main>{children}</main>
      <footer className={styles.footer}>© Made with ❤️ by JemJem</footer>
    </div>
  );
};

export default Layout;
