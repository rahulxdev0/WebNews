import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useCreateDistrictMutation, usePartialUpdateDistrictMutation } from '../../store/api/districtEndponts';
// import { 
//   useCreateDistrictMutation, 
//   usePartialUpdateDistrictMutation 
// } from './districtEndpoints';

const AddEditDistrictModal = ({ visible, onCancel, district }) => {
  const [form] = Form.useForm();
  const [createDistrict] = useCreateDistrictMutation();
  const [updateDistrict] = usePartialUpdateDistrictMutation();
  const [messageApi, contextHolder] = message.useMessage();

  React.useEffect(() => {
    if (district) {
      form.setFieldsValue({
        name: district.name,
      });
    } else {
      form.resetFields();
    }
  }, [district, form]);

  const handleSubmit = async (values) => {
    try {
      if (district) {
        await updateDistrict({ id: district.id, ...values }).unwrap();
        messageApi.success('District updated successfully');
      } else {
        await createDistrict(values).unwrap();
        messageApi.success('District created successfully');
      }
      onCancel();
    } catch (err) {
      messageApi.error('Failed to save district');
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={district ? 'Edit District' : 'Add District'}
        open={visible}
        onOk={() => form.submit()}
        onCancel={onCancel}
        okText={district ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="District Name"
            rules={[{ required: true, message: 'Please input district name!' }]}
          >
            <Input placeholder="Enter district name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditDistrictModal;