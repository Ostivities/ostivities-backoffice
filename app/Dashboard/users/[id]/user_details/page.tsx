'use client';
import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Image from 'next/image';
import "@/app/globals.css";
import { Form, Input, Button, Upload, message, Modal, Row, Col, Space, Select, Checkbox } from 'antd';
import "@/app/globals.css";
import { LinkOutlined, XOutlined, FacebookFilled, InstagramFilled, TwitterOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { IFormInput } from '@/app/utils/interface';
import useFetch from "@/app/components/forms/users/auth";
import { Label } from '@/app/components/typography/Typography';
import { useState } from 'react';
import { useParams, usePathname, useRouter } from "next/navigation";

const Usersdetails = () => {
    const router = useRouter();
  const [profileImage, setProfileImage] = useState<string>("/images/emptyimage.png");
  const [uploadButton, setUploadButton] = useState<string>("Update");
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const {isLoggedIn} = useFetch() // Update this based on your authentication logic

  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={25}
        width={25}
        onClick={() => router.push('/Dashboard/users')}
        className="cursor-pointer"
      />
      <div className="flex-center justify-between w-full">
      <h1 style={{ fontSize: '24px' }}>User Information</h1>

      {isLoggedIn && ( 
      <button
        onClick={() => router.push('/Dashboard/users/${record.id}/user_details/events-created')}
        className="bg-OWANBE_PRY rounded-full px-4 py-2 text-xs font-semibold text-white flex items-center"
      >
        <EyeOutlined/>
        <span className="pl-1">View Events Created</span>
      </button>
    )}
  </div>
  </div>
  );
  

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
  } = useForm<IFormInput>({
    mode: "all",
  });

  
  // Function to handle image removal
  const handleRemoveImage = () => {
    Modal.confirm({
      title: 'Are you sure you want to remove this users image?',
      icon: null,
      onOk() {
        setProfileImage("/images/emptyimage.png");
        setUploadButton("Update");
        setIsImageUploaded(false);
        message.success('Image removed successfully');
      },
    });
  };

  // Function to save changes
  const handleSaveChanges = () => {
    console.log("Image saved:", profileImage);
    setUploadButton("Update");
    setIsImageUploaded(false);
  };
 
  const handleBack = () => {
    router.back();
  };

  const handleDeactivate = () => {
    console.log("User Deactivated");
  };

  const handleActivate = () => {
    console.log("User Activated");
  };

  const [specialtyType, setspecialtyType] = useState<string>("");
  const [status, setstatus] = useState<string>("");
  const { Option } = Select;

  const handlespecialtyTypeChange = (value: string) => {
    setspecialtyType(value);
  };

  const handlestatusChange = (value: string) => {
    setstatus(value);
  };



  return (
    <DashboardLayout title={title} isLoggedIn>
    <div style={{ maxWidth: '1700px', marginLeft: '50px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <div className="relative profile-image-container">
          <Image
            src={profileImage}
            alt="Profile Picture"
            width={96}
            height={96}
            className="object-cover w-24 h-24 rounded-full"
          />
        </div>
         
        {/* Conditional rendering for upload and remove buttons */}
          <Button
            type="default"
            className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-25 rounded-2xl float-end"
            style={{
              borderRadius: "20px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={handleRemoveImage} // Handle remove image action
          >
            Remove Image
          </Button>
      </div>

      <div style={{ maxWidth: '1300px', marginLeft: '-20px' }}>
  <Form
    layout="vertical"
    className="w-full space-y-6 px-8 py-5"
    style={{ marginBottom: '20px' }}
  >
   <div className="grid grid-cols-2 gap-x-14">
  {/* First Row */}
  <Form.Item
    label="Account Type"
    name="accountType"
    style={{
      fontSize: "14.5px",
      fontFamily: "BricolageGrotesqueregular",
    }}
  >
    <Input defaultValue="Personal" disabled style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item
    label="Email Address"
    name="emailAddress"
    style={{
      fontSize: "14.5px",
      fontFamily: "BricolageGrotesqueregular",
    }}
  >
    <Input defaultValue="user@example.com" disabled style={{ width: '100%' }} />
  </Form.Item>

  {/* Second Row */}
  <Form.Item
    label="First Name"
    name="firstName"
    style={{
      fontSize: "14.5px",
      fontFamily: "BricolageGrotesqueregular",
    }}
  >
    <Input defaultValue="John" disabled style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item
    label="Date Joined"
    name="dateJoined"
    style={{
      fontSize: "14.5px",
      fontFamily: "BricolageGrotesqueregular",
    }}
  >
    <Input defaultValue="2023-09-01" disabled style={{ width: '100%' }} />
  </Form.Item>

  {/* Third Row */}
  <Form.Item
    label="Last Name"
    name="lastName"
    style={{
      fontSize: "14.5px",
      fontFamily: "BricolageGrotesqueregular",
    }}
  >
    <Input defaultValue="Doe" disabled style={{ width: '100%' }} />
  </Form.Item>

  <Form.Item
    label="Status"
    name="status"
    style={{
      fontSize: "14.5px",
      fontFamily: "BricolageGrotesqueregular",
    }}
  >
    <Input defaultValue="Active" disabled style={{ width: '100%' }} />
  </Form.Item>
</div>

      

          <div style={{ textAlign: 'center', marginTop: '60px' }}>

          <Button
              type="default"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold equal-width-button"
              style={{ marginBottom: '20px', marginRight: '10px' }}
              onClick={handleBack}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              style={{ marginBottom: '20px' }}
              
              onClick={handleDeactivate}
            >
              Deactivate
            </Button>
          </div>
        </Form>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Usersdetails;