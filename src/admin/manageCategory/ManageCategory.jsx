import React, { useState } from 'react';
import { Button, Card, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddEditCategoryModal from './AddEditCategoryModal';
import CategoryTable from './CategoryTable';
import { useGetCategoriesQuery } from '../../store/api/categoryEndpoints';

const ManageCategory = () => {
  const { data: categories, isLoading, isFetching } = useGetCategoriesQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalVisible(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  return (
    <Card
      title="Manage Categories"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Category
        </Button>
      }
    >
      <Spin spinning={isLoading || isFetching}>
        <CategoryTable
          data={categories || []}
          loading={isLoading}
          onEdit={handleEdit}
        />
      </Spin>

      <AddEditCategoryModal
        visible={modalVisible}
        onCancel={handleModalClose}
        category={selectedCategory}
      />
    </Card>
  );
};

export default ManageCategory;