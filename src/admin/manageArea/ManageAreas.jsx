import React, { useState } from 'react';
import { Button, Card, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddEditAreaModal from './AddEditAreaModal';
import AreaTable from './AreaTable';
import { useGetAreasQuery } from '../../store/api/areaEndpoints';
// import { useGetAreasQuery } from './areaEndpoints';

const ManageAreas = () => {
  const { data: areas, isLoading, isFetching } = useGetAreasQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const handleAdd = () => {
    setSelectedArea(null);
    setModalVisible(true);
  };

  const handleEdit = (area) => {
    setSelectedArea(area);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedArea(null);
  };

  return (
    <Card
      title="Manage Areas"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Area
        </Button>
      }
    >
      <Spin spinning={isLoading || isFetching}>
        <AreaTable
          data={areas || []}
          loading={isLoading}
          onEdit={handleEdit}
        />
      </Spin>

      <AddEditAreaModal
        visible={modalVisible}
        onCancel={handleModalClose}
        area={selectedArea}
      />
    </Card>
  );
};

export default ManageAreas;