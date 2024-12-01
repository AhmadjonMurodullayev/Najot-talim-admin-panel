import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEdite } from "../pages/home/mutate/useEdite";
import { useFayl } from "../pages/home/mutate/useFayl";
import { useUserId } from "../pages/home/mutate/useUserId";

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  userId: any | number;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  onClose,
  userId,
}) => {
  const { mutate: editUser } = useEdite();
  const { mutate: uploadFile } = useFayl();
  const { data: userData, refetch: fetchUser } = useUserId(userId); // Fetch user by ID
  const [form] = Form.useForm();
  const [uploadedFile, setUploadedFile] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);
  console.log(userId);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        title: userData.title,
        courseId: userData.courseId,
      });
      setUploadedFile(userData.attachment);
    }
  }, [userData, form]);

  const handleFileUpload = (file: any) => {
    const formData = new FormData();
    formData.append("files", file.file);

    uploadFile(formData, {
      onSuccess: (res) => {
        setUploadedFile(res.data[0]);
        message.success("File uploaded successfully!");
        file.onSuccess?.();
      },
      onError: (err) => {
        message.error("File upload failed.");
        file.onError?.(err);
      },
    });
  };

  const handleSubmit = (data: { title: string; courseId: number }) => {
    if (!userId || !uploadedFile) return;

    editUser(
      {
        id: userId,
        title: data.title,
        courseId: data.courseId,
        attachment: {
          url: uploadedFile.path,
          origName: uploadedFile.fileName,
          size: uploadedFile.size,
        },
      },
      {
        onSuccess: () => {
          message.success("User updated successfully!");
          onClose();
        },
        onError: () => {
          message.error("Error occurred while updating user.");
        },
      }
    );
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onClose}
      footer={null}
      style={{ borderRadius: "10px", overflow: "hidden" }}
      bodyStyle={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        style={{ fontSize: "14px", color: "#555" }}
      >
        <Form.Item
          name="title"
          label="Course Title"
          rules={[{ required: true, message: "Please enter the course title" }]}
        >
          <Input
            style={{
              borderRadius: "6px",
              padding: "10px",
              border: "1px solid #d9d9d9",
            }}
          />
        </Form.Item>

        <Form.Item
          name="courseId"
          label="Course ID"
          rules={[{ required: true, message: "Please enter the course ID" }]}
        >
          <Input
            type="number"
            style={{
              borderRadius: "6px",
              padding: "10px",
              border: "1px solid #d9d9d9",
            }}
          />
        </Form.Item>

        <Upload
          customRequest={handleFileUpload}
          showUploadList
          defaultFileList={
            uploadedFile
              ? [
                  {
                    uid: "-1",
                    name: uploadedFile.origName,
                    status: "done",
                    url: uploadedFile.url,
                  },
                ]
              : []
          }
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
            Upload File
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
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
