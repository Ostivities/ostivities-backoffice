"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import useFetch from "@/app/components/forms/users/auth";
import Details from "@/app/components/forms/audit-trail/Details";
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import React from 'react';

function Audittrail(): JSX.Element {
  const router = useRouter();
  const {isLoggedIn} = useFetch() // Update this based on your authentication logic

  const header = (
    <div className="flex-center justify-between w-full">
      <h1 className="text-2xl">Audit Trail</h1>
    </div>
  );

  return (
    <DashboardLayout title={header} isLoggedIn>
      <div className="w-full mx-auto flex flex-col space-y-5 py-6">
        {/* Content details */}
        <Details />
      </div>
    </DashboardLayout>
  );
}

export default Audittrail;
