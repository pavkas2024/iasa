'use client';

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./TwoColumnLayout.module.css";

type MenuItem = {
  key: string;
  label: string;
  href: string;
};

type Props = {
  menuItems: MenuItem[];
  children: ReactNode;
};

const TwoColumnLayout: React.FC<Props> = ({ menuItems, children }) => {
  const pathname = usePathname() || '';

  const activeItem = menuItems.find(item => pathname === item.href) 
                  || menuItems.find(item => pathname.startsWith(item.href))
                  || menuItems[0];

  return (
    <div className={styles.twoColumnContainer}>
      <aside className={styles.twoColumnSidebar}>
        <ul className={styles.twoColumnMenu}>
          {menuItems.map(item => (
            <li key={item.key} className={item.key === activeItem.key ? styles.active : ""}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className={styles.twoColumnContent}>{children}</main>
    </div>
  );
};

export default TwoColumnLayout;
