import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

import { useGetDistrictsQuery } from '../../store/api/districtEndponts';
import { useCreateAreaMutation, usePartialUpdateAreaMutation } from '../../store/api/areaEndpoints';

const AddEditAreaModal = ({ visible, onCancel, area }) => {
  const [form] = Form.useForm();
  const [createArea] = useCreateAreaMutation();
  const [updateArea] = usePartialUpdateAreaMutation();
  const { data: districts, isLoading: districtsLoading } = useGetDistrictsQuery();
  const [messageApi, contextHolder] = message.useMessage();

  React.useEffect(() => {
    if (area) {
      form.setFieldsValue({
        name: area.name,
        district_id: area.district_id,
      });
    } else {
      form.resetFields();
    }
  }, [area, form]);

  const handleSubmit = async (values) => {
    try {
      if (area) {
        await updateArea({ id: area.id, ...values }).unwrap();
        messageApi.success('Area updated successfully');
      } else {
        await createArea(values).unwrap();
        messageApi.success('Area created successfully');
      }
      onCancel();
    } catch (err) {
      messageApi.error('Failed to save area');
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={area ? 'Edit Area' : 'Add Area'}
        open={visible}
        onOk={() => form.submit()}
        onCancel={onCancel}
        okText={area ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Area Name"
            rules={[{ required: true, message: 'Please input area name!' }]}
          >
            <Input placeholder="Enter area name" />
          </Form.Item>
          
          <Form.Item
            name="district_id"
            label="District"
            rules={[{ required: true, message: 'Please select district!' }]}
          >
            <Select
              loading={districtsLoading}
              placeholder="Select district"
              options={districts?.map(district => ({
                value: district.id,
                label: district.name,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditAreaModal;