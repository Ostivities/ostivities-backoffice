"use client";
import { Label } from "@/app/components/typography/Typography";
import "@/app/globals.css";
import { generateRandomString } from "@/app/utils/helper";
import { AuditTrailDataType } from "@/app/utils/interface";
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

const { Search } = Input;

const AudittrailTable: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning">();

  // Updated data with new columns
  const data: AuditTrailDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    user: `User ${Math.floor(Math.random() * 10 + 1)}`,
    userRole: ["Admin", "User", "Viewer"][Math.floor(Math.random() * 3)],
    clientName: `Client ${index + 1}`,
    actionDescription: ["Created a record", "Updated a profile", "Deleted a file"][Math.floor(Math.random() * 3)],
    dateTime: `2024-09-${(index + 1).toString().padStart(2, "0")} 12:00 PM`,
    id: generateRandomString(10),
  }));

  // Get unique values for filters
  const uniqueUserRoles = [...new Set(data.map(item => item.userRole))];
  const uniqueClientNames = [...new Set(data.map(item => item.clientName))];
  const uniqueActionDescriptions = [...new Set(data.map(item => item.actionDescription))];

  // Updated columns with filters
  const columns: ColumnsType<AuditTrailDataType> = [
    {
      title: (
        <Label
          content="User"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "user",
    },
    {
      title: (
        <Label
          content="User Role"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "userRole",
      filters: uniqueUserRoles.map(role => ({ text: role, value: role })),
      onFilter: (value, record) => record.userRole.includes(value as string),
    },
    {
      title: (
        <Label
          content="Client Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "clientName",
      filters: uniqueClientNames.map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.clientName.includes(value as string),
    },
    {
      title: (
        <Label
          content="Action Description"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "actionDescription",
      filters: uniqueActionDescriptions.map(desc => ({ text: desc, value: desc })),
      onFilter: (value, record) => record.actionDescription.includes(value as string),
    },
    {
      title: (
        <Label
          content="Date & Time"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "dateTime",
      sorter: (a, b) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
    },
  ];

  // Remaining code...
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.clientName.toLowerCase().includes(searchText.toLowerCase())
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
      XLSX.writeFile(wb, "AuditTrailData.xlsx");
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
      doc.save("AuditTrailData.pdf");
    }
  };

  return (
    <React.Fragment>
      <DeleteTicket
        open={isShown}
        onCancel={() => setIsShown(false)}
        onOk={() => setIsShown(false)}
        actionType={actionType}
      />
      <div className="w-full flex flex-col space-y-6">
        <div className="flex justify-between items-center mb-4">
          <Search
            placeholder="Search client names"
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

export default AudittrailTable;
