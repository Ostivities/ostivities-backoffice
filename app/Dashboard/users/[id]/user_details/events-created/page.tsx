"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import useFetch from "@/app/components/forms/create-events/auth";
import Details from "@/app/components/forms/events-created/Details";
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from "next/navigation";

function EventsCreated(): JSX.Element {
  const router = useRouter();
  const { isLoggedIn } = useFetch(); // Update this based on your authentication logic

  const header = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={25}
        width={25}
        onClick={() => router.push('/Dashboard/users/${record.id}/user_details')}
        className="cursor-pointer"
      />
      <div className="flex-center justify-between w-full">
        <h1 className="text-2xl">Events Created</h1>
      </div>
    </div> // Closing div for the header
  );

  return (
    <DashboardLayout title={header} isLoggedIn={isLoggedIn}>
      <div className="w-full mx-auto flex flex-col space-y-5 py-6">
        {/* Content for Events Created */}
        <Details />
      </div>
    </DashboardLayout>
  );
}

export default EventsCreated;