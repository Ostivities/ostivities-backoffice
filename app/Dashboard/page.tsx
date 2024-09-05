"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React from "react";
import { useRouter } from "next/navigation";
import soon from '@/public/comingsoonpage.svg';
import Image from 'next/image';

function Dashboard(): JSX.Element {
  const router = useRouter();

  const handleBackToDiscovery = () => {
    // Add the route you want to navigate to
    router.push("/Dashboard");
  };

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: '24px' }}>Dashboard</h1>
    </div>
  );

  return (
    <DashboardLayout title={title} isLoggedIn>
      <div className="w-full mx-auto flex flex-row items-center justify-between space-y-5 py-6">
        <div className="w-1/2 flex flex-col gap-2 p-[8rem] justify-center">
          <p className="w-full md:w-full font-BricolageGrotesqueMedium text-md mb-6">Charts will be here........!</p>
        </div>
        <div className="w-1/2 flex items-center justify-center">
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
