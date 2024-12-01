import React, { useState } from "react";
import { Table, Button, Input, Dropdown, Menu, Pagination, Spin } from "antd";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useGetUser } from "./mutate/useGetUser";
import { useDebounce } from "../../hooks/useDebounke";
import { useSearch } from "../../hooks/useSorch";
import { AddUserModal } from "../../components/add-user-modal";
import { ColumnsType } from "antd/es/table";
import { EditUserModal } from "../../components/edite-user-modal";
import { Navigate } from "react-router-dom";

export const Home: React.FC = () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return <Navigate to="/" />;
  }
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [input, setInput] = useState<string>("");

  const debounceValue = useDebounce(input);
  const { data: searchData } = useSearch(debounceValue);
  const { data: fetchedData, isLoading: isFetching } = useGetUser();

  const effectiveData = searchData?.data?.contracts?.length
    ? searchData.data.contracts
    : fetchedData?.data?.contracts;

  const paginatedData =
    effectiveData?.map((contract: any) => ({
      id: contract.id,
      title: contract.title,
      createdAt: contract.createdAt,
      course: {
        id: contract.course?.id,
        name: contract.course?.name,
        createdAt: contract.course?.createdAt,
      },
      attachment: {
        url: contract.attachment?.url,
        origName: contract.attachment?.origName,
        size: contract.attachment?.size,
      },
    })) || [];

  const displayedData = paginatedData.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * pagination.pageSize
  );

  const handlePaginationChange = (page: number, size?: number) => {
    setPagination({ currentPage: page, pageSize: size || 10 });
  };

  const openEditModal = (record: any) => {
    setSelectedUser(record);
    setIsModalEdit(true);
  };

  const columns: ColumnsType<any> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) =>
        index + 1 + (pagination.currentPage - 1) * pagination.pageSize,
    },
    {
      title: "Name",
      dataIndex: ["attachment", "origName"],
      key: "origName",
      render: (origName: string) => origName || "N/A",
    },
    {
      title: "Course",
      dataIndex: ["title"],
      key: "course",
      render: (courseName: string) => courseName || "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={() => openEditModal(record)}
              >
                Edit
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button shape="circle" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        borderRadius: "10px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "24px",
          color: "#333",
        }}
      >
        Users
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Input.Search
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by name"
          allowClear
          style={{
            width: "300px",
            borderRadius: "6px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            setSelectedUser(null);
            setIsModalVisible(true);
          }}
          style={{
            borderRadius: "6px",
            backgroundColor: "#1890ff",
            fontWeight: "500",
          }}
        >
          Add User
        </Button>
      </div>

      {isFetching ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={displayedData}
          pagination={false}
          rowKey="id"
          bordered
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        />
      )}

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          current={pagination.currentPage}
          pageSize={pagination.pageSize}
          total={paginatedData.length}
          showSizeChanger
          onChange={handlePaginationChange}
          style={{ borderRadius: "6px" }}
        />
      </div>

      <AddUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <EditUserModal
        visible={isModalEdit}
        onClose={() => setIsModalEdit(false)}
        userId={selectedUser}
      />
    </div>
  );
};
