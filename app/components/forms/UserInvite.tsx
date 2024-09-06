"use client";
import { Small } from "@/app/components/typography/Typography";
import { useLogin } from "@/app/hooks/auth/auth.hook";
import Auth from "@/app/utils/Auth";
import { ILogin } from "@/app/utils/interface";
import { Button, Form, FormProps, Input, Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const { Option } = Select;

function UserinviteForm(): JSX.Element {
  const { loginUser } = useLogin();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish: FormProps<ILogin>["onFinish"] = async (value) => {
    if (value) {
      const response = await loginUser.mutateAsync(value);
      if (response.status === 200) {
        form.resetFields();
        router.push("/Login");
      }
    }
  };

  const onFinishFailed: FormProps<ILogin>["onFinishFailed"] = (errorInfo) => {
    return errorInfo;
  };

  return (
    <Form
      name="validateOnly"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
      className="w-full font-BricolageGrotesqueRegular flex flex-col"
      style={{ fontFamily: "BricolageGrotesqueRegular" }}
    >
      <Form.Item
        label="User's Email Address"
        style={{ fontFamily: "BricolageGrotesqueRegular" }}
        className="font-BricolageGrotesqueRegular"
      >
        <Form.Item
          name={"email"}
          noStyle
          rules={[{ required: true, message: "Please input user's email" }]}
        >
          <Input
            type="email"
            placeholder="Enter user's email"
            className="placeholder:font-BricolageGrotesqueRegular"
            autoComplete="off"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="User's Role"
        style={{ fontFamily: "BricolageGrotesqueRegular" }}
        className="font-BricolageGrotesqueRegular"
      >
        <Form.Item
          name={"role"}
          noStyle
          rules={[{ required: true, message: "Please select user's role" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select user's role"
            className="font-BricolageGrotesqueRegular"
          >
            <Option value="customer care">Customer Care</Option>
            <Option value="finance manager">Finance Manager</Option>
            <Option value="product manager">Product Manager</Option>
            <Option value="HR manager">HR Manager</Option>
            <Option value="Admin">Admin</Option>
          </Select>
        </Form.Item>
      </Form.Item>
      <br />
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="font-BricolageGrotesqueLight text-base"
          style={{
            background: "#E20000",
            borderRadius: "25px",
            width: "100%",
            height: "51px",
          }}
          loading={loginUser.isPending}
        >
          Invite User
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UserinviteForm;
