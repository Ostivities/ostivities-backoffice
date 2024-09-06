"use client";

import { Label } from "@/app/components/typography/Typography";
import "@/app/globals.css";
import { generateRandomString } from "@/app/utils/helper";
import { AdminDataType } from "@/app/utils/interface";
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

// Imports remain the same

const AdminManagement: React.FC = () => {
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


  const handleAction = (record: AdminDataType) => {
    setIsModalOpen(true);
    setModalData(record);
  };

  // Define possible designations
  const designations: AdminDataType["designation"][] = [
    "CEO",
    "CTO",
    "Product Manager",
    "HR Manager",
    "Admin",
    "Finance Manager",
    "Customer Care",
  ];

  // Generate unique data ensuring only one CEO and one CTO
  const generateUniqueData = () => {
    const data: AdminDataType[] = [];
    const usedDesignations: Set<string> = new Set();

    for (let index = 0; index < 50; index++) {
      let designation: AdminDataType["designation"] =
        designations[Math.floor(Math.random() * designations.length)];

      // Ensure only one CEO and one CTO
      if (designation === "CEO" && usedDesignations.has("CEO")) {
        designation = "Product Manager";
      } else if (designation === "CTO" && usedDesignations.has("CTO")) {
        designation = "Product Manager";
      }

      usedDesignations.add(designation);

      data.push({
        key: `${index + 1}`,
        staffName: `Staff ${index + 1}`,
        designation,
        dateAssigned: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
        id: generateRandomString(10),
      });
    }

    return data;
  };

  const data: AdminDataType[] = generateUniqueData();

  // Updated columns
  const columns: ColumnsType<AdminDataType> = [
    {
      title: (
        <Label
          content="Staff Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "staffName",
      sorter: (a, b) => a.staffName.localeCompare(b.staffName),
    },
    {
      title: (
        <Label
          content="Designation"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "designation",
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: (
        <Label
          content="Date Assigned"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "dateAssigned",
      sorter: (a, b) =>
        new Date(a.dateAssigned).getTime() -
        new Date(b.dateAssigned).getTime(),
    },
    {
      title: (
        <Label
          content="Action"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "",
      render: (text: any, record: AdminDataType) => (
        <Button
          type="primary"
          shape="round"
          style={{
            borderRadius: "25px",
            backgroundColor: "#e20000",
            borderColor: "#e20000",
            minWidth: "70px",
            padding: "4px",
          }}
          onClick={() => {
            setIsModalOpen(true);
            setActionType("detail");
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.staffName.toLowerCase().includes(searchText.toLowerCase())
  );

  const hasSelected = selectedRowKeys.length > 0;

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? data.filter((item) => selectedRowKeys.includes(item.key))
      : data;

    const dataToExport = exportData.map(({ id, ...rest }) => rest);

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb, "UsersData.xlsx");
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
      doc.save("UsersData.pdf");
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
            placeholder="Search staff"
            onChange={onSearchChange}
            style={{ width: 300 }}
          />
           {/* <Button
              type="primary"
              size="large"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-40 rounded-2xl float-end"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
                margin: '10px'
              }}
              onClick={() => setShowNewVendorDetails(true)}
            >
              Add New User
            </Button> */}
          {hasSelected && (
            <div>
              {/* <Button
                type="primary"
                className="font-BricolageGrotesqueSemiBold continue font-bold custom-button"
                danger
                style={{ borderRadius: 15, marginRight: 8 }}
                onClick={() => {
                  setIsShown(true);
                  setActionType("delete");
                }}
              >
                <DeleteOutlined />
              </Button> */}
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
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          columns={columns}
          dataSource={filteredData}
          className="font-BricolageGrotesqueRegular w-full"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredData.length,
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

export default AdminManagement;

