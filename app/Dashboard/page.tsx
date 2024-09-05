"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Card } from "antd"; // Assuming you use Ant Design

// Load ApexCharts dynamically to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const COLORS = ['#28a745', '#ffc107', '#dc3545'];
const eventColors = ['#007bff', '#6f42c1', '#e83e8c', '#17a2b8', '#ffc107'];

interface CardMetricsProps {
  title: string;
  value: string | number;
  cardStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const CardMetrics: React.FC<CardMetricsProps> = ({
  title,
  value,
  cardStyle,
  titleStyle,
  valueStyle,
  containerStyle,
}) => {
  return (
    <Card
      className="rounded-3xl"
      style={{
        borderRadius: '20px',
        boxShadow: '0px 8px 24px 0px #00000014',
        ...cardStyle,
      }}
    >
      <div
        className="flex flex-col mx-auto text-center py-6"
        style={containerStyle}
      >
        <p
          className="font-BricolageGrotesqueSemiBold font-semibold text-OWANBE_PRY"
          style={titleStyle}
        >
          {title}
        </p>
        <p
          className="font-BricolageGrotesqueSemiBold font-semibold text-OWANBE_DARK"
          style={valueStyle}
        >
          {value}
        </p>
      </div>
    </Card>
  );
};

const Dashboard = (): JSX.Element => {
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");
  const [selectedUserCategory, setSelectedUserCategory] = useState("All");
  const [selectedEventCategory, setSelectedEventCategory] = useState("All");

  const userCategories = ["Personal", "Organization"];
  const eventCategories = ["Wedding", "Birthday", "Music Show", "Hangout", "Tech Events"];

  const userAccountOptions: ApexCharts.ApexOptions = {
    labels: ['Active', 'Pending', 'Inactive'],
    colors: COLORS,
    legend: { position: 'bottom' },
  };

  const userAccountSeries = [40, 30, 30]; // Active, Pending, Inactive

  const eventCategoryOptions: ApexCharts.ApexOptions = {
    labels: eventCategories,
    colors: eventColors,
    legend: { position: 'bottom' },
  };

  const eventCategorySeries = [50, 30, 20, 10, 40]; // Example data for each category

  const totalEventOptions: ApexCharts.ApexOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: eventCategories },
    colors: ['#e20000'],
  };

  const totalEventSeries = [{ name: 'Total Events', data: [40, 30, 20, 10, 50] }];

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

  const salesRevenue = 250000;
  const formattedRevenue = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(salesRevenue);

  const systemHealthPercentage = 84; // Example percentage
  const systemHealthColor =
    systemHealthPercentage > 70 ? 'green' :
    systemHealthPercentage >= 50 ? 'yellow' : 'red';

  const cardStyle = { width: 'full', height: '150px' };
  const titleStyle = { fontSize: '20px' };
  const valueStyle = { fontSize: '19px' };
  const containerStyle = { gap: '4px' };

  const title = (
    <div className="flex justify-between items-center w-full relative pb-2">
      <h1 style={{ fontSize: '24px', fontFamily: 'Bricolage Grotesque' }}>Dashboard</h1>
      <div className="flex space-x-4">
        {/* Filters */}
        <select
          className="p-2 border rounded text-sm"
          value={selectedMonth}
          onChange={(e) => handleFilterChange("Month", e.target.value)}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          {/* Add more months */}
        </select>
        <select
          className="p-2 border rounded text-sm"
          value={selectedYear}
          onChange={(e) => handleFilterChange("Year", e.target.value)}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <select
          className="p-2 border rounded text-sm"
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
        {/* Cards Section */}
        <div className="grid grid-cols-4 gap-x-6 mb-6">
          <CardMetrics
            title="Total Users"
            value={userAccountSeries.reduce((a, b) => a + b, 0)}
            cardStyle={cardStyle}
            titleStyle={titleStyle}
            valueStyle={valueStyle}
            containerStyle={containerStyle}
          />
          <CardMetrics
            title="Total Events Created"
            value={eventCategorySeries.reduce((a, b) => a + b, 0)}
            cardStyle={cardStyle}
            titleStyle={titleStyle}
            valueStyle={valueStyle}
            containerStyle={containerStyle}
          />
          <CardMetrics
            title="Total Revenue"
            value={formattedRevenue}
            cardStyle={cardStyle}
            titleStyle={titleStyle}
            valueStyle={valueStyle}
            containerStyle={containerStyle}
          />
          <CardMetrics
            title="System Health"
            value={`${systemHealthPercentage}%`}
            cardStyle={{ ...cardStyle, color: systemHealthColor }}
            titleStyle={titleStyle}
            valueStyle={{ ...valueStyle, color: systemHealthColor }}
            containerStyle={containerStyle}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* User Account Status Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md h-[300px]" style={{ borderRadius: '20px', boxShadow: "0px 8px 24px 0px #00000014" }}>
            <h1 style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Users Account Status</h1>
            {userAccountSeries && (
              <Chart options={userAccountOptions} series={userAccountSeries} type="pie" height={250} />
            )}
          </div>

          {/* Event Category Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md h-[300px]" style={{ borderRadius: '20px', boxShadow: "0px 8px 24px 0px #00000014" }}>
            <h1 style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Event Category</h1>
            {eventCategorySeries && (
              <Chart options={eventCategoryOptions} series={eventCategorySeries} type="pie" height={250} />
            )}
          </div>

          {/* Total Events Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md h-[300px]" style={{ borderRadius: '20px', boxShadow: "0px 8px 24px 0px #00000014" }}>
            <h1 style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Total Events</h1>
            {totalEventSeries && (
              <Chart options={totalEventOptions} series={totalEventSeries} type="bar" height={250} />
            )}
          </div>

          {/* User Distribution Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md h-[300px]" style={{ borderRadius: '20px', boxShadow: "0px 8px 24px 0px #00000014" }}>
            <h1 style={{ fontSize: '16px', fontFamily: 'Bricolage Grotesque' }}>Users Distribution by Events</h1>
            {userDistributionSeries && (
              <Chart options={userDistributionOptions} series={userDistributionSeries} type="bar" height={250} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
