import { AdminUserTabs, userTabs } from '@/app/staticData/userProfileTabsData';
import React from 'react';
import Tabs from '../Tabs/Tabs';

const AdminLayout = ({
  children,
  admin,
}: {
  children: React.ReactNode;
  admin: boolean;
}) => {
  return (
    <section className="mt-8">
      <Tabs tabsData={admin ? AdminUserTabs : userTabs} />
      {children}
    </section>
  );
};

export default AdminLayout;
