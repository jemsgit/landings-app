// components/Layout.tsx
import React from "react";
import "../../app/globals.css"; // Make sure to import global CSS here

import localFont from "next/font/local";

const geistSans = localFont({
  src: "../../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
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

const Layout: React.FC = ({ children }) => {
  return (
    <div className={`${inter.variable} ${geistMono.variable}`}>
      <main>{children}</main>
      <footer>
        <p>© Made by JemJem</p>
      </footer>
    </div>
  );
};

export default Layout;
