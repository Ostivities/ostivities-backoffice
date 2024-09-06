"use client";

import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Tab from "@/app/ui/molecules/Tab";
import { useCallback, useState } from "react";
import Admin from "@/app/ui/organisms/AdminManagement";
import RevenueGenerated from "@/app/ui/organisms/RevenueGenerated";

const tabs = ["Admin Management", "Revenue Generated"];

function Settings() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const selectCurrentTab = useCallback((tab: string) => {
    setCurrentTab(tab);
  }, []);

  const tabStyle = {
    fontFamily: 'Bricolage Grotesque, sans-serif',
  };

  return (
    <DashboardLayout
      title={<h1 style={{ fontSize: '24px' }}>Settings</h1>}
      extraComponents={
        <Tab
          tabs={tabs}
          currentTab={currentTab}
          handleCurrentTab={selectCurrentTab}
          style={tabStyle}  // Pass the style to the Tab component
        />
      }
      isLoggedIn
    >
      {currentTab === "Admin Management" ? (
        <Admin />
      ) : currentTab === "Revenue Generated" ? (
        <RevenueGenerated />
      ) : null}
    </DashboardLayout>
  );
}

export default Settings;
