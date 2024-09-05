"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React from "react";
import { useRouter } from "next/navigation";
import soon from '@/public/Disputes.svg';
import Image from 'next/image';

function Support(): JSX.Element {
  const router = useRouter();

  const handleBackToDiscovery = () => {
    // Open the Tawk.to dashboard in a new tab
    window.open("https://dashboard.tawk.to/#/inbox/66aa1bcd32dca6db2cb7f021/all", "_blank");
  };

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: '24px' }}>Support</h1>
    </div>
  );

  return (
    <DashboardLayout title={title} isLoggedIn>
      <div className="w-full mx-auto flex flex-row items-center justify-between space-y-5 py-6">
        <div className="w-1/2 flex flex-col gap-2 p-[8rem] justify-center">
          <h2 className="w-full md:w-full font-BricolageGrotesqueMedium text-3xl font-bold mb-4">Welcome to Ostivities support channel.</h2>
          <p className="w-full md:w-full font-BricolageGrotesqueMedium text-md mb-6">Click the button below to access the support channel!</p>
          <button
            onClick={handleBackToDiscovery}
            className="primary-btn hover:none w-100 text-center text-white py-2 px-6 rounded-full text-lg"
            style={{ borderRadius: '20px' }} // Apply corner radius
          >
            Open Support Channel
          </button>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <Image 
            src={soon} 
            alt="Coming Soon" 
            className="ms-1" 
            width={430} // Adjust the width as needed
            height={430} // Adjust the height as needed
            style={{ objectFit: 'contain' }} // Maintain aspect ratio
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Support;
