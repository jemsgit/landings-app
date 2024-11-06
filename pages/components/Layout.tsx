// components/Layout.tsx
import React from "react";
import "../../app/globals.css"; // Make sure to import global CSS here

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <footer>
        <p>© 2024 My App</p>
      </footer>
    </div>
  );
};

export default Layout;
