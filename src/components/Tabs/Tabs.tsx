'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Tabs {
  label: string;
  pathname: string;
}

export interface TabsData {
  tabsData: Tabs[];
}

const Tabs = ({ tabsData }: TabsData) => {
  const path = usePathname();

  return (
    <div className=" tabs">
      {tabsData.map((tab) => {
        return (
          <Link
            className={path?.includes(tab?.pathname) ? 'active' : ''}
            key={tab?.label}
            href={tab?.pathname}
          >
            {tab?.label}
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
