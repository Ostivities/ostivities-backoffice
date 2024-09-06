import { IModal } from "@/app/utils/interface";
import { Button, Input, Modal, Select, Space } from "antd";
import React, { useState } from "react";
import { Heading5, Label } from "../typography/Typography";

const { Option } = Select;

const StaffDetail = ({ open, onCancel, onOk, data }: IModal) => {
  const [dateAssigned, setDateAssigned] = useState(data?.dateAssigned);

  // Handler to set the current date when the "Update" button is clicked
  const handleUpdate = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Format to YYYY-MM-DD
    setDateAssigned(currentDate); // Set the "Date Assigned" to the current date

    // Ensure onOk is a function before calling it
    if (typeof onOk === 'function') {
      onOk();
    }
  };

  return (
    <Modal
      title={
        <>
          <Heading5
            content={"Staff Details"}
            className=""
            styles={{ fontSize: "16px" }}
          />
          <br />
        </>
      }
      open={open}
      onCancel={onCancel}
      footer={
        <Space className="mx-auto text-center w-full flex flex-row justify-center pb-9">
           <Button
              key="cancel"
              type="default"
              size="large"
              className="font-BricolageGrotesqueSemiBold button-styles sign-in cursor-pointer font-bold"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              size="large"
              form="add-event-coordinator-form"
              htmlType="submit"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
              >
              Update
            </Button>
          </Space>
      }
      width={600}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 pb-4">
        <Space direction="vertical" size={"small"}>
          <Label content="Staff Name" className="font-BricolageGrotesqueRegular" />
          <Input 
            placeholder="Enter staff name" 
            defaultValue={data?.staffName} 
          />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label content="Designation" className="font-BricolageGrotesqueRegular" />
          <Select 
            mode="multiple" 
            defaultValue={data?.designation} 
            style={{ width: '100%' }} 
            placeholder="Select designation(s)"
          >
            <Option value="Admin">Admin</Option>
            <Option value="Product Manager">Product Manager</Option>
            <Option value="HR Manager">HR Manager</Option>
            <Option value="Finance Manager">Finance Manager</Option>
            <Option value="Customer Care">Customer Care</Option>
          </Select>
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label content="Status" className="font-BricolageGrotesqueRegular" />
          <Select 
            defaultValue={data?.status} 
            style={{ width: '100%' }} 
            placeholder="Select status"
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label content="Date Assigned" className="font-BricolageGrotesqueRegular" />
          <Input 
            type="date" 
            value={dateAssigned} 
            placeholder="Select date assigned"
            readOnly 
          />
        </Space>
      </div>
    </Modal>
  );
};

export default StaffDetail;
