"use client";

import { Label } from "@/app/components/typography/Typography";
import "@/app/globals.css";
import { generateRandomString } from "@/app/utils/helper";
import { RevenueDataType } from "@/app/utils/interface";
import DeleteTicket from "@/app/components/OstivitiesModal/DeleteEvent";
import {
  DeleteOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import StaffDetail from "@/app/components/OstivitiesModal/StaffDetail";

const { Search } = Input;

const formatCurrency = (value: number) => {
  return `₦${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};


const RevenueGenerated: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning" | "detail">();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNewVendorDetails, setShowNewVendorDetails] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});

  const handleAction = (record: RevenueDataType) => {
    setIsModalOpen(true);
    setModalData(record);
  };

  // Generate unique data for demonstration
  const generateUniqueData = () => {
    const data: RevenueDataType[] = [];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const statuses: ("Positive" | "Negative" | "Neutral")[] = ["Positive", "Negative", "Neutral"];
    const years = [2023, 2024, 2025]; // Add more years if needed
  
    years.forEach(year => {
      months.forEach((month) => {
        data.push({
          key: `${year}-${month}`,
          month: month,
          year: year,
          expenses: formatCurrency(Math.random() * 1000000),
          totalRevenue: formatCurrency(Math.random() * 1000000),
          netProfit: formatCurrency(Math.random() * 1000000),
          revenueGrowth: `${(Math.random() * 100).toFixed(2)}%`,
          cashFlowStatus: statuses[Math.floor(Math.random() * statuses.length)],
        });
      });
    });
  
    return data;
  };

  const data: RevenueDataType[] = generateUniqueData();

  // Updated columns
  const columns: ColumnsType<RevenueDataType> = [
    {
      title: (
        <Label
          content="Month"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "month",
      sorter: (a, b) => a.month.localeCompare(b.month),
    },
    {
      title: (
        <Label
          content="Year"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "year",
      filters: Array.from(new Set(data.map(item => item.year))).map(year => ({
        text: `${year}`,
        value: year,
      })),
      onFilter: (value, record) => record.year === value,
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: (
        <Label
          content="Expenses"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "expenses",
      sorter: (a, b) => parseFloat(a.expenses.replace(/[₦,]/g, '')) - parseFloat(b.expenses.replace(/[₦,]/g, '')),
    },
    {
      title: (
        <Label
          content="Total Revenue"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "totalRevenue",
      sorter: (a, b) => parseFloat(a.totalRevenue.replace(/[₦,]/g, '')) - parseFloat(b.totalRevenue.replace(/[₦,]/g, '')),
    },
    {
      title: (
        <Label
          content="Net Profit"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "netProfit",
      sorter: (a, b) => parseFloat(a.netProfit.replace(/[₦,]/g, '')) - parseFloat(b.netProfit.replace(/[₦,]/g, '')),
    },
    {
      title: (
        <Label
          content="Revenue Growth"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "revenueGrowth",
      sorter: (a, b) => parseFloat(a.revenueGrowth) - parseFloat(b.revenueGrowth),
    },
    {
      title: (
        <Label
          content="Cash Flow Status"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "cashFlowStatus",
      filters: [
        { text: "Positive", value: "Positive" },
        { text: "Negative", value: "Negative" },
        { text: "Neutral", value: "Neutral" },
      ],
      onFilter: (value, record) => record.cashFlowStatus.includes(value as string),
      render: (status: string) => {
        let style = {};
        let dotColor = "";
  
        if (status === "Positive") {
          style = { color: "#009A44", backgroundColor: "#E6F5ED" }; // Green
          dotColor = "#009A44";
        } else if (status === "Negative") {
          style = { color: "#D30000", backgroundColor: "#FFD3D3" }; // Red
          dotColor = "#D30000";
        } else if (status === "Neutral") {
          style = { color: "#F68D2E", backgroundColor: "#FDE8D5" }; // Orange
          dotColor = "#F68D2E";
        }
  
        return (
          <span
            style={{
              ...style,
              padding: "2px 10px",
              borderRadius: "25px",
              fontWeight: "500",
              display: "inline-block",
              minWidth: "80px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: dotColor,
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              }}
            ></span>
            {status}
          </span>
        );
      },
    },
  ];
  

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.month.toLowerCase().includes(searchText.toLowerCase())
  );

  const hasSelected = selectedRowKeys.length > 0;

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? data.filter((item) => selectedRowKeys.includes(item.key))
      : data;
  
    const dataToExport = exportData.map(({ key, ...rest }) => rest);
  
    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb, "RevenueData.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(dataToExport[0])],
        body: dataToExport.map((item) => Object.values(item)),
        didDrawCell: (data: {
          column: { index: number };
          cell: { styles: { fillColor: string } };
        }) => {
          if (data.column.index === 0) {
            data.cell.styles.fillColor = "#e20000";
          }
        },
      });
      doc.save("RevenueData.pdf");
    }
  };  

  return (
    <React.Fragment>
      {isModalOpen && actionType === "detail" && (
        <StaffDetail
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          data={modalData}
        />
      )}
      <DeleteTicket
        open={isShown}
        onCancel={() => setIsShown(false)}
        onOk={() => setIsShown(false)}
        actionType={actionType}
      />
      <div className="w-full flex flex-col space-y-6">
        <div className="flex justify-between items-center mb-4">
          <Search
            placeholder="Search by month"
            onChange={onSearchChange}
            style={{ width: 300 }}
          />
          {hasSelected && (
            <div>
              <Button
                type="default"
                className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                style={{ borderRadius: 15, marginRight: 8 }}
                onClick={() => handleExport("excel")}
              >
                <FileExcelOutlined />
              </Button>
              <Button
                type="default"
                className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                style={{ borderRadius: 15 }}
                onClick={() => handleExport("pdf")}
              >
                <FilePdfOutlined />
              </Button>
            </div>
          )}
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </React.Fragment>
  );
};

export default RevenueGenerated;
