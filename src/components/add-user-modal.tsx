import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { userCreate } from "../pages/home/mutate/userCreate";
import { useFayl } from "../pages/home/mutate/useFayl";
import { dataType } from "../pages/home/mutate/type";

export interface formDataType {
  title?: string;
  courseId?: number;
}

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  visible,
  onClose,
}) => {
  const { mutate } = userCreate();
  const { mutate: mutateFayl } = useFayl();
  const [rensData, setResponsData] = useState<dataType>();

  const submit = (data: formDataType) => {
    mutate(
      {
        title: data.title,
        courseId: 0,
        attachment: {
          url: rensData?.data[0].path,
          origName: rensData?.data[0].fileName,
          size: rensData?.data[0].size,
        },
      },
      {
        onSuccess: (res) => {
          console.log(res);
          message.success("Success");
          onClose();
        },
        onError: (err) => {
          console.log(err);
          message.error("Error occurred while saving user");
        },
      }
    );
  };

  const handleFileUpload = (file: any) => {
    const formData = new FormData();

    formData.append("files", file.file);

    mutateFayl(formData, {
      onSuccess: (res) => {
        setResponsData(res);

        message.success("File uploaded successfully!");
        file.onSuccess?.();
      },
      onError: (err) => {
        message.error("File upload failed.");
        file.onError?.(err);
      },
    });
  };

  return (
    <Modal
      title="Yangi Foydalanuvchi Qo'shish"
      open={visible}
      onCancel={onClose}
      footer={null}
      style={{
        borderRadius: "10px",
        overflow: "hidden",
      }}
      bodyStyle={{
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
      }}
    >
      <Form
        layout="vertical"
        onFinish={submit}
        style={{
          fontSize: "14px",
          color: "#555",
        }}
      >
        <div>
          <Form.Item
            name={"title"}
            label={"Kurs"}
            rules={[{ required: true, message: "Kursni tanlang" }]}
          >
            <Input
              style={{
                borderRadius: "6px",
                padding: "10px",
                border: "1px solid #d9d9d9",
              }}
            />
          </Form.Item>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Form.Item
            name={"courseId"}
            label="Nomi"
            rules={[{ required: true, message: "Nomini kiriting" }]}
          >
            <Input
              style={{
                borderRadius: "6px",
                padding: "10px",
                border: "1px solid #d9d9d9",
              }}
            />
          </Form.Item>
        </div>
        <Upload
          customRequest={handleFileUpload}
          showUploadList={true}
          maxCount={1}
          accept=".jpg,.png,.doc,.docx"
          listType="text"
        >
          <Button
            icon={<UploadOutlined />}
            style={{
              borderRadius: "6px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #d9d9d9",
            }}
          >
            Faylni yuklash
          </Button>
        </Upload>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Button
            onClick={onClose}
            style={{
              borderRadius: "6px",
              padding: "5px 20px",
              backgroundColor: "#fff",
              border: "1px solid #d9d9d9",
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              borderRadius: "6px",
              padding: "5px 20px",
              fontWeight: "500",
            }}
          >
            Saqlash
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
