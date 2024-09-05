"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Load ApexCharts dynamically to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const COLORS = ['#28a745', '#ffc107', '#dc3545'];
const eventColors = ['#007bff', '#6f42c1', '#e83e8c', '#17a2b8', '#ffc107'];

function Dashboard(): JSX.Element {
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");
  const [selectedUserCategory, setSelectedUserCategory] = useState("All");
  const [selectedEventCategory, setSelectedEventCategory] = useState("All");

  // Dummy data for the filters
  const userCategories = ["Personal", "Organization"];
  const eventCategories = ["Wedding", "Birthday", "Music Show", "Hangout", "Tech Events"];

  // Data for the charts
  const userAccountOptions: ApexCharts.ApexOptions = {
    labels: ['Active', 'Pending', 'Inactive'],
    colors: COLORS,
    legend: { position: 'bottom' },
  };

  // Series for user account status
  const userAccountSeries = [40, 30, 30]; // Active, Pending, Inactive

  const eventCategoryOptions: ApexCharts.ApexOptions = {
    labels: eventCategories,
    colors: eventColors,
    legend: { position: 'bottom' },
  };

  // Series for event categories
  const eventCategorySeries = [50, 30, 20, 10, 40]; // Example data for each category

  const totalEventOptions: ApexCharts.ApexOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: eventCategories },
    colors: ['#e20000'],
  };

  // Series for total number of events
  const totalEventSeries = [{ name: 'Total Events', data: [40, 30, 20, 10, 50] }]; // Example data for total events

  const userDistributionOptions: ApexCharts.ApexOptions = {
    chart: { type: 'bar', stacked: true },
    xaxis: { categories: ['Jumoke Randle', 'Martins Colins', 'Mike Johnson', 'Onome Rose', 'Bankole Idris'] },
    colors: ['#f96332', '#6f42c1', '#e83e8c', '#17a2b8', '#ffc107'],
  };

  const userDistributionSeries = [
    { name: 'Wedding', data: [10, 20, 30, 25, 35] },
    { name: 'Birthday', data: [15, 30, 20, 25, 30] },
    { name: 'Music Show', data: [20, 25, 35, 30, 25] },
    { name: 'Hangout', data: [25, 20, 25, 35, 20] },
    { name: 'Tech Events', data: [30, 15, 10, 20, 15] },
  ];

  // Handle filter change
  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case "Month":
        setSelectedMonth(value);
        break;
      case "Year":
        setSelectedYear(value);
        break;
      case "UserCategory":
        setSelectedUserCategory(value);
        break;
      case "EventCategory":
        setSelectedEventCategory(value);
        break;
      default:
        break;
    }
  };

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: '24px', fontFamily: 'Bricolage Grotesque' }}>Dashboard</h1>
      {/* Filters on the same line as the title */}
      <div className="flex space-x-4">
        <select
          className="p-2 border rounded text-sm"
          style={{ fontFamily: 'Bricolage Grotesque' }}
          value={selectedMonth}
          onChange={(e) => handleFilterChange("Month", e.target.value)}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          {/* Add more months */}
        </select>
        <select
          className="p-2 border rounded text-sm"
          style={{ fontFamily: 'Bricolage Grotesque' }}
          value={selectedYear}
          onChange={(e) => handleFilterChange("Year", e.target.value)}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <select
          className="p-2 border rounded text-sm"
          style={{ fontFamily: 'Bricolage Grotesque' }}
          value={selectedUserCategory}
          onChange={(e) => handleFilterChange("UserCategory", e.target.value)}
        >
          <option value="All">All</option>
          {userCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded text-sm"
          style={{ fontFamily: 'Bricolage Grotesque' }}
          value={selectedEventCategory}
          onChange={(e) => handleFilterChange("EventCategory", e.target.value)}
        >
          <option value="All">All</option>
          {eventCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <DashboardLayout title={title} isLoggedIn>
      <div className="w-full mx-auto py-6 space-y-5 bg-transparent">
        <div className="grid grid-cols-2 gap-6">
          {/* User Account Status Chart */}
          <div className="bg-white p-4 rounded-lg h-[300px]" style={{ boxShadow: "0px 8px 24px 0px #00000014" }}>
            <h1 style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Users Account Status</h1>
            {userAccountSeries && (
              <Chart options={userAccountOptions} series={userAccountSeries} type="pie" height={250} />
            )}
          </div>

          {/* Event Creation by Category Doughnut Chart */}
          <div className="bg-white p-4 rounded-lg h-[300px]" style={{ boxShadow: "0px 8px 24px 0px #00000014" }}>
            <h1 style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Creation of Event by Category</h1>
            {eventCategorySeries && (
              <Chart options={eventCategoryOptions} series={eventCategorySeries} type="donut" height={250} />
            )}
          </div>

          {/* Total Number of Events Created */}
          <div className="bg-white p-4 rounded-lg h-[300px]" style={{ boxShadow: "0px 8px 24px 0px #00000014" }}>
            <h1 style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Total Number of Events Created</h1>
            {totalEventSeries && (
              <Chart options={totalEventOptions} series={totalEventSeries} type="bar" height={250} />
            )}
          </div>

          {/* Distribution of Users by Event Categories */}
          <div className="bg-white p-4 rounded-lg h-[300px]" style={{ boxShadow: "0px 8px 24px 0px #00000014" }}>
            <h1 style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Distribution of Users by Event Categories</h1>
            {userDistributionSeries && (
              <Chart options={userDistributionOptions} series={userDistributionSeries} type="bar" height={250} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
