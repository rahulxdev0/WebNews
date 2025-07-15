import React from 'react';
import { Table, Button, Popconfirm, Space, message, Tag, Image } from 'antd';
import { useDeleteNewsMutation } from '../../store/api/newsEndpoints';

const NewsTable = ({ data, loading, onEdit }) => {
  const [deleteNews] = useDeleteNewsMutation();
  const [messageApi, contextHolder] = message.useMessage();
  console.log("data in news table", data)

  const handleDelete = async (id) => {
    try {
      await deleteNews(id).unwrap();
      messageApi.success('News deleted successfully');
    } catch (err) {
      messageApi.error('Failed to delete news');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text) => text.length > 50 ? `${text.substring(0, 50)}...` : text,
    },
    {
      title: 'Category',
      key: 'category',
      render: (_, record) => (
        <Tag color="blue">{record.category?.name || 'Unknown'}</Tag>
      ),
    },
    {
      title: 'Area (District)',
      key: 'area',
      render: (_, record) => (
        <Tag color="green">
          {record.area?.name || 'Unknown'} ({record.area?.district?.name || 'Unknown'})
        </Tag>
      ),
    },
    // {
    //   title: 'Image',
    //   key: 'image',
    //   render: (_, record) => (
    //     record.image ? <Image src={record.image} width={50} /> : 'No Image'
    //   ),
    // },
    // In your table columns configuration
{
  title: 'Image',
  dataIndex: 'image',
  key: 'image',
  render: (image) => image ? (
    <img 
      src={image} 
      alt="News" 
      style={{ width: 50, height: 50, objectFit: 'cover' }}
    />
  ) : 'No image',
},
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
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
            title="Are you sure to delete this news?"
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
        dataSource={Array.isArray(data) ? data : [data]}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </>
  );
};

export default NewsTable;