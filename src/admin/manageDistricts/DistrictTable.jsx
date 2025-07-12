import React from 'react';
import { Table, Button, Popconfirm, Space, message } from 'antd';
import { useDeleteDistrictMutation } from '../../store/api/districtEndponts';
// import { useDeleteDistrictMutation } from './districtEndpoints';

const DistrictTable = ({ data, loading, onEdit }) => {
  const [deleteDistrict] = useDeleteDistrictMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async (id) => {
    try {
      await deleteDistrict(id).unwrap();
      messageApi.success('District deleted successfully');
    } catch (err) {
      messageApi.error('Failed to delete district');
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
            title="Are you sure to delete this district?"
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

export default DistrictTable;