import React from 'react';
import { Table, Button, Popconfirm, Space, message } from 'antd';
import { useDeleteCategoryMutation } from '../../store/api/categoryEndpoints';
// import { useDeleteCategoryMutation } from './categoryEndpoints';

const CategoryTable = ({ data, loading, onEdit }) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      messageApi.success('Category deleted successfully');
    } catch (err) {
      messageApi.error('Failed to delete category');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default CategoryTable;