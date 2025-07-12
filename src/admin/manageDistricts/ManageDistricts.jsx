import React, { useState } from 'react';
import { Button, Card, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddEditDistrictModal from './AddEditDistrictModal';
import DistrictTable from './DistrictTable';
import { useGetDistrictsQuery } from '../../store/api/districtEndponts';

const ManageDistricts = () => {
  const { data: districts, isLoading, isFetching } = useGetDistrictsQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleAdd = () => {
    setSelectedDistrict(null);
    setModalVisible(true);
  };

  const handleEdit = (district) => {
    setSelectedDistrict(district);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedDistrict(null);
  };

  return (
    <Card
      title="Manage Districts"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add District
        </Button>
      }
    >
      <Spin spinning={isLoading || isFetching}>
        <DistrictTable
          data={districts || []}
          loading={isLoading}
          onEdit={handleEdit}
        />
      </Spin>

      <AddEditDistrictModal
        visible={modalVisible}
        onCancel={handleModalClose}
        district={selectedDistrict}
      />
    </Card>
  );
};

export default ManageDistricts;