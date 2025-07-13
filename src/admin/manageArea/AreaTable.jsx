import React from 'react';
import { Table, Button, Popconfirm, Space, message, Tag } from 'antd';
import { useDeleteAreaMutation } from '../../store/api/areaEndpoints';

const AreaTable = ({ data, loading, onEdit }) => {
  console.log("area data", data);
  const [deleteArea] = useDeleteAreaMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async (id) => {
    try {
      await deleteArea(id).unwrap();
      messageApi.success('Area deleted successfully');
    } catch (err) {
      messageApi.error('Failed to delete area');
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
      title: 'District',
      key: 'district',
      render: (_, record) => (
        <Tag color="blue">{record.district?.name || 'Unknown'}</Tag>
      ),
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
            title="Are you sure to delete this area?"
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

export default AreaTable;